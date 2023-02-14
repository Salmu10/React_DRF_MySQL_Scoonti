from datetime import datetime
from rest_framework import serializers
from .models import Rent
from scoonti.app.users.models import User
from scoonti.app.stations.models import Scooter, Slot

class RentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rent
        fields = ['id', 'user_id', 'scooter_id', 'initial_slot_id','end_slot_id', 'initial_date', 'end_date']

    def to_rent(instance):
        return ({
            "id": instance.id,
            "user": instance.user_id,
            "scooter": instance.scooter_id,
            "initial_slot": instance.initial_slot_id,
            "end_slot": instance.end_slot_id,
            "initial_date": instance.initial_date,
            "end_date": instance.end_date,
        })

    def rent(context):
        username = context['username']
        slot_id = context['slot_id']

        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        slot = Slot.objects.get(pk=slot_id)

        if slot is None or slot.scooter_id is None:
            raise serializers.ValidationError('Slot not found')
        
        scooter = Scooter.objects.get(pk=slot.scooter_id)
        if scooter is None:
            raise serializers.ValidationError('Scooter not found')

        user_rent = Rent.objects.filter(user_id=user.id, end_slot_id=None)
        if len(user_rent) > 0:
            raise serializers.ValidationError('You only can rent one scooter')

        rent = Rent.objects.create(user_id=user.id, scooter_id=slot.scooter_id, initial_slot_id=slot_id)
        rent.save()

        slot.scooter_id = None
        slot.status = 'vacant'
        slot.save()

        scooter.status = 'in_use'
        scooter.save()
        return rent

    def getOneRent(context):
        username = context['username']

        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        rent = Rent.objects.get(user_id=user.id, end_slot_id=None)
        return rent

    def bringbackScooter(context):
        username = context['username']
        scooter_id = context['scooter_id']
        slot_id = context['slot_id']

        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        scooter = Scooter.objects.get(pk=scooter_id)

        if scooter is None:
            raise serializers.ValidationError('Scooter not found')

        rent = Rent.objects.get(user_id=user.id, scooter_id=scooter_id, end_slot_id=None)

        if rent is None:
            raise serializers.ValidationError('Rent not found')

        new_slot = Slot.objects.get(pk=slot_id)

        if new_slot is None or new_slot.scooter_id is not None:
            raise serializers.ValidationError('Slot not found or in use')

        if new_slot.status == "manteinance":
            raise serializers.ValidationError('Slot in manteinance')

        rent.end_slot_id = new_slot.id
        rent.end_date = datetime.now()
        rent.save()

        new_slot.scooter_id = scooter.id
        new_slot.status = 'in_use'
        new_slot.save()

        scooter.status = 'vacant'
        scooter.save()

        return rent

    def delete(context):
        rent_id = context['rent_id']

        rent = Rent.objects.get(pk=rent_id)

        if rent is None:
            raise serializers.ValidationError('Rent is not find')

        if rent.end_slot_id is None:
            raise serializers.ValidationError('Rent is not over')

        rent.delete()
        return True
