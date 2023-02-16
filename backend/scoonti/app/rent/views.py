from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import RentSerializer
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from scoonti.app.core.permissions import IsAdmin
from .models import Rent

class RentView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def rent(self, request, slot_id):
        username = request.user
        serializer_context = { 'username': username, 'slot_id': slot_id }
        serializer = RentSerializer.rent(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))

    def getOneRent(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = RentSerializer.getOneRent(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))

    def bringbackScooter(self, request):
        data = request.data['scooter']
        username = request.user
        serializer_context = {'username': username, 'slot_id': data['end_slot'], 'scooter_id': data['scooter_id']}
        serializer = RentSerializer.bringbackScooter(context=serializer_context)
        return Response(RentSerializer.to_rent(serializer))

class RentAdminView(viewsets.GenericViewSet):
    permission_classes = [IsAdmin]

    def getAllRents(self, request):
        data = Rent.objects.all()
        serializer = RentSerializer(data, many=True)
        return Response(serializer.data)

    def deleteRent(self, request, id):
        rent = Rent.objects.get(id=id)
        rent.delete()
        return Response({'data': 'Rent deleted successfully'})

