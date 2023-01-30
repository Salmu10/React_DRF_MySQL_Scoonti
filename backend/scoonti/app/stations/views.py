from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import viewsets

from .models import Station
from .serializers import StationSerializer
from .models import Scooter
from .serializers import ScooterSerializer
from .models import Slot
from .serializers import SlotSerializer

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
        station = request.data.get('station')
        serializer = StationSerializer(data=station)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        if (request.data.get('slot')):
            slots = request.data.get('slot')
            slot_station = {'station_id': serializer.data['id']}
            for i in range(slots['num_slots']):
                SlotSerializer.create(context=slot_station)
        return Response(serializer.data)

    def put(self, request, slug):
        station = Station.objects.get(slug=slug)
        data = request.data.get('station')
        serializer = StationSerializer(instance=station, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, slug):
        station = Station.objects.get(slug=slug)
        station.delete()
        return Response({'data': 'Station deleted successfully'})

class ScooterView(viewsets.GenericViewSet):

    def getScooters(self, request, slug=None):
        scooters = Scooter.objects.all()
        scooters_serializer = ScooterSerializer(scooters, many=True)
        return Response(scooters_serializer.data)

    def getOneScooter(self, request, slug):
        scooter = Scooter.objects.get(slug=slug)
        scooter_serializer = ScooterSerializer(scooter)
        return Response(scooter_serializer.data)

    def post(self, request):
        scooter = request.data.get('scooter')
        serializer = ScooterSerializer(data=scooter)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    def put(self, request, slug):
        scooter = Scooter.objects.get(slug=slug)
        data = request.data.get('scooter')
        serializer = ScooterSerializer(instance=scooter, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        slot = request.data.get('slot')
        if (slot):
            if slot['id'] is not None:
                slot_context = {'scooter_id': scooter.id, 'status': 'used'}
                saved_slot = Slot.objects.get(pk=slot['id'])
                SlotSerializer.update(instance=saved_slot, context=slot_context)

        return Response(serializer.data)

    def delete(self, request, slug):
        scooter = Scooter.objects.get(slug=slug)
        scooter.delete()
        return Response({'data': 'Scooter deleted successfully'})

class SlotView(viewsets.GenericViewSet):

    def getSlots(self, request, id=None):
        if id:
            slot = Slot.objects.all(pk=id)
            serializer_one = SlotSerializer(slot)
            return Response(serializer_one.data)
        if request.GET.get('station_id') is not None:
            slots = Slot.objects.filter(station_id=request.GET.get('station_id'))
        else:
            slots = Slot.objects.all()
        serializer = SlotSerializer(slots, many=True)
        return Response(serializer.data)

    def detach_scooter(self, request, id):
        saved_slot = Slot.objects.all(pk=id)

        saved_scooter_id = SlotSerializer.to_Slot(saved_slot)

        saved_scooter = Scooter.objects.all(pk=saved_scooter_id['scooter_id'])
        data = {'status': 'used'}
        serializer = ScooterSerializer(instance=saved_scooter, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

        slot_context = {'scooter_id': 0, 'status': 'unused'}
        serializer_slot = SlotSerializer.update(
            instance=saved_slot, context=slot_context)

        return Response(SlotSerializer.to_Slot(serializer_slot))

    def put_status_only(self, request, id):
        saved_slot = Slot.objects.all(pk=id)
        slot_data = request.data.get('slot')
        slot_context = {'scooter_id': 0, 'status': slot_data['status']}
        serializer_slot = SlotSerializer.update(instance=saved_slot, context=slot_context)

        return Response(SlotSerializer.to_Slot(serializer_slot))
