from rest_framework import serializers
from .models import IncidenceSlot, IncidenceScooter, Notification
from scoonti.app.users.models import User
from scoonti.app.stations.models import Slot, Scooter

class IncidenceSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidenceSlot
        fields = [ 'id', 'title', 'status', 'desc', 'user_id', 'slot_id']

    def to_incidence_slot(instance):
        return ({
            "id": instance.id,
            "title": instance.title,
            "status": instance.status,
            "desc": instance.desc,
            "user_id": instance.user_id,
            "slot_id": instance.slot_id
        })

    def create(context):
        username = context['username']
        slot_id = context['slot_id']
        title = context['title']
        desc = context['desc']

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        slot = Slot.objects.get(pk=slot_id)
        if slot is None:
            raise serializers.ValidationError('Slot not found')

        if title is None:
            raise serializers.ValidationError('Title is required')

        if desc is None:
            raise serializers.ValidationError('Body is required')

        incidence = IncidenceSlot.objects.create(title=title, desc=desc, user_id=user.id, slot_id=slot.id)

        incidence.save()
        return incidence

    def updateStatus(id, context):
        new_status = context['status']
        incidence = IncidenceSlot.objects.get(id=id)

        if incidence is None:
            raise serializers.ValidationError('Slot not found')

        if (incidence.status == 'resolved'):    
            raise serializers.ValidationError('The incidence is already resolved')

        if (new_status == 'pending'):
            incidence.status = 'pending'
        elif (new_status == 'in_progress'):
            incidence.status = 'in_progress'
            Notification.objects.create(desc="The slot incidence: " + str(incidence.id) + " is in progress.", user_id=incidence.user_id, seen=False)
        elif (new_status == 'resolved'):
            incidence.status = 'resolved'
            Notification.objects.create(desc="The slot incidence: " + str(incidence.id) + " is resolved.", user_id=incidence.user_id, seen=False)
        else:
            raise serializers.ValidationError('The incidence is closed')

        incidence.save()
        return incidence

    def getIncidentsUser(username):
        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        incidents = IncidenceSlot.objects.filter(user_id=user.id)
        return incidents

class IncidenceScooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidenceScooter
        fields = [ 'id', 'title', 'status', 'desc', 'user_id', 'scooter_id']

    def to_incidence_scooter(instance):
        return ({
            "id": instance.id,
            "title": instance.title,
            "status": instance.status,
            "desc": instance.desc,
            "user_id": instance.user_id,
            "scooter_id": instance.scooter_id
        })

    def create(context):
        username = context['username']
        scooter_id = context['scooter_id']
        title = context['title']
        desc = context['desc']

        user = User.objects.get(username=username)
        if user is None:
            raise serializers.ValidationError('User not found')

        scooter = Scooter.objects.get(pk=scooter_id)
        if scooter is None:
            raise serializers.ValidationError('Scooter not found')

        if title is None:
            raise serializers.ValidationError('Title is required')

        if desc is None:
            raise serializers.ValidationError('Body is required')

        incidence = IncidenceScooter.objects.create(title=title, desc=desc, user_id=user.id, scooter_id=scooter.id)

        incidence.save()
        return incidence

    def updateStatus(id, context):
        new_status = context['status']
        incidence = IncidenceScooter.objects.get(id=id)

        if incidence is None:
            raise serializers.ValidationError('Slot not found')

        if (incidence.status == 'resolved'):    
            raise serializers.ValidationError('The incidence is already resolved')

        if (new_status == 'pending'):
            incidence.status = 'pending'
        elif (new_status == 'in_progress'):
            incidence.status = 'in_progress'
            Notification.objects.create(desc="The scooter incidence: " + str(incidence.id) + " is in progress.", user_id=incidence.user_id, seen=False)
        elif (new_status == 'resolved'):
            incidence.status = 'resolved'
            Notification.objects.create(desc="The scooter incidence: " + str(incidence.id) + " is resolved.", user_id=incidence.user_id, seen=False)
        else:
            raise serializers.ValidationError('The incidence is closed')

        incidence.save()
        return incidence

        incidence.save()
        return incidence

    def getIncidentsUser(username):
        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        incidents = IncidenceScooter.objects.filter(user_id=user.id)
        return incidents

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'desc', 'seen']

    def to_notification(instance):
        return ({
            "id": instance.id,
            "desc": instance.body,
            "seen": instance.seen
        })

    def getUserNotification(username):
        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        notification = Notification.objects.filter(user_id=user.id, seen=False)
        return notification

    def seeNotification(context):
        notification_id = context['id']
        username = context['username']
        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User is not found')

        notification = Notification.objects.get(pk=notification_id, user_id=user.id, seen=False)
        if notification is None:
            raise serializers.ValidationError('Notification not found')

        notification.seen = True
        notification.save()

        return notification
