from rest_framework import serializers
from .models import Station
from .models import Scooter
from .models import Slot

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

class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = ['id', 'station_id', 'scooter_id', 'status']

    def to_Slot(instance):
        return {
            "id": instance.id,
            "station_id": instance.station_id,
            "scooter_id": instance.scooter_id,
            "status": instance.status,
        }

    def create(context):
        station_id = context['station_id']
        station = Station.objects.get(pk=station_id)

        if station is None:
            raise serializers.ValidationError('Station is not find')

        slot = Slot.objects.create(station_id=station_id, scooter_id=None, status="vacant")
        slot.save()
        return slot
