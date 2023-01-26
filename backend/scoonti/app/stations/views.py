from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import viewsets

from .models import Station
from .serializers import StationSerializer

class StationView(viewsets.GenericViewSet):
    def getStations(self, request):
        stations = Station.objects.all()
        stations_serializer = StationSerializer(stations, many=True)
        return Response(stations_serializer.data)
    
    def getOneStation(self, request, slug):
        station = Station.objects.get(slug=slug)
        station_serializer = StationSerializer(station)
        return Response(station_serializer.data)

    def post(self, request):
        station = request.data
        serializer = StationSerializer(data=station)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(serializer.data)
        # return Response(request.data)

    def put(self, request, slug):
        station = Station.objects.get(slug=slug)
        data = request.data
        serializer = StationSerializer(instance=station, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, slug):
        station = Station.objects.get(slug=slug)
        station.delete()
        return Response({'data': 'Station deleted successfully'})