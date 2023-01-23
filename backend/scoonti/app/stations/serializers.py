from rest_framework import serializers
from .models import Station

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['id', 'slug', 'name', 'image', 'status', 'latitude', 'longitude']

    def to_Station(instance):
        return {
            "id": instance.id,
            "slug": instance.slug,
            "name": instance.name,
            "image": instance.image,
            "status": instance.status,
            "latitude": instance.latitude,
            "longitude": instance.longitude
        }