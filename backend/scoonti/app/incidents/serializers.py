from rest_framework import serializers
from .models import IncidenceSlot, IncidenceScooter, Notification
from scoonti.app.users.models import User
from scoonti.app.stations.models import Slot, Scooter

class IncidenceSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidenceSlot
        fields = [ 'title', 'status', 'desc', 'user_id', 'slot_id']

    def to_incident(instance):
        return ({
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

        incident = IncidenceSlot.objects.create(title=title, desc=desc, user_id=user.id, slot_id=slot.id)

        incident.save()
        return incident

    def updateStatus(slug):
        incident = IncidenceSlot.objects.get(slug=slug)

        if incident is None:
            raise serializers.ValidationError('Slot not found')

        if (incident.status == 'pending'):
            incident.status = 'in_progress'
        elif (incident.status == 'in_progress'):
            incident.status = 'in_revision'
        elif (incident.status == 'in_revision'):
            incident.status = 'resolved'
        else:
            raise serializers.ValidationError('The incident is closed')

        incident.save()
        return incident

    def getIncidentsUser(username):
        user = User.objects.get(username=username)

        if user is None:
            raise serializers.ValidationError('User not found')

        incidents = IncidenceSlot.objects.filter(user_id=user.id)
        return incidents

class IncidenceScooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidenceScooter
        fields = [ 'title', 'status', 'desc', 'user_id', 'scooter_id']

    def to_incident(instance):
        return ({
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

        incident = IncidenceScooter.objects.create(title=title, desc=desc, user_id=user.id, scooter_id=scooter.id)

        incident.save()
        return incident

    def updateStatus(slug):
        incident = IncidenceScooter.objects.get(slug=slug)

        if incident is None:
            raise serializers.ValidationError('Scooter not found')

        if (incident.status == 'pending'):
            incident.status = 'in_progress'
        elif (incident.status == 'in_progress'):
            incident.status = 'in_revision'
        elif (incident.status == 'in_revision'):
            incident.status = 'resolved'
        else:
            raise serializers.ValidationError('The incident is closed')

        incident.save()
        return incident

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
