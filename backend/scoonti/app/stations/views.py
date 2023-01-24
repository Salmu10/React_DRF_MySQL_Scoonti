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
        if slug:
            return Response(slug)

    def createStation(self, request):
        station = request.data
        serializer = StationSerializer(data=station)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(serializer.data)

    # def put(self, request, slug):
