from rest_framework import serializers
from .models import Station
from .models import Scooter
from .models import Slot
from scoonti.app.rent.models import Rent
from scoonti.app.users.models import User
from random import randint

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['id', 'slug', 'name', 'image', 'status', 'latitude', 'longitude']

    def to_representation(self, instance):
        total_slots = len(Slot.objects.filter(station_id=instance.id))
        total_scooters = len(Slot.objects.filter(station_id=instance.id, status='in_use'))
        return {
            "id": instance.id,
            "slug": instance.slug,
            "name": instance.name,
            "image": instance.image,
            "status": instance.status,
            "latitude": instance.latitude,
            "longitude": instance.longitude,
            "total_slots": total_slots,
            "total_scooters": total_scooters
        }

class ScooterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scooter
        fields = ['id', 'slug', 'name', 'status']

    def to_Scooter(instance):
        return {
            "id": instance.id,
            "slug": instance.slug,
            "name": instance.name,
            "status": instance.status,
        }
    
    def getUserScooter(context):
        username = context['username']
        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        rent = Rent.objects.get(user_id=user.id, end_slot_id=None)
        if rent is None:
            raise serializers.ValidationError('You have not rented any scooter')

        scooter = Scooter.objects.get(pk=rent.scooter_id)
        if scooter is None:
            raise serializers.ValidationError('Error retreiving the scooter')

        return scooter

class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = ['id', 'station_id', 'scooter_id', 'status', 'slot_number']

    def to_Slot(instance):
        return {
            "id": instance.id,
            "station_id": instance.station_id,
            "scooter_id": instance.scooter_id,
            "status": instance.status,
            "slot_number": instance.slot_number,
        }

    def create(context, number):
        station_id = context['station_id']
        station = Station.objects.get(pk=station_id)

        if station is None:
            raise serializers.ValidationError('Station not found')

        slot = Slot.objects.create(station_id=station_id, scooter_id=None, status="vacant", slot_number=number+1)
        slot.save()
        return slot

    def update(context, instance):
        scooter_id = context['scooter_id']
        context_status = context['status']

        if context_status == 'manteinance':
            instance.status = 'manteinance'
            instance.save()
            return instance

        if scooter_id != 0 and instance.scooter_id is not None:
            raise serializers.ValidationError('Slot is already in use')

        if scooter_id != 0 and not None:
            scooter = Scooter.objects.get(pk=scooter_id)
            if scooter is None:
                raise serializers.ValidationError('Scooter not found')

            instance.scooter_id = scooter_id
            instance.status = "in_use"

        if scooter_id == 0:
            instance.scooter_id = None
            instance.status = "vacant"

        instance.save()
        return instance

    def create_slot_dummys(context):
        station_id = context['station_id']
        status = context['status']
        number = context['slot_number'] + 1
        scooters = Scooter.objects.filter(status='in_use')

        if (status == 'in_use' and len(scooters) > 0):
            scooter = Scooter.objects.get(pk=scooters[randint(0, len(scooters)-1)].id)
            slot = Slot.objects.create(station_id=station_id, scooter_id=scooter.id, status="in_use", slot_number=number)
            scooter.status = 'vacant'
            scooter.save()
        else:
            slot = Slot.objects.create(station_id=station_id, scooter_id=None, status="vacant", slot_number=number)
            
        slot.save()
        return slot
