from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from scoonti.app.core.permissions import IsAdmin
from .models import IncidenceSlot
from .serializers import IncidenceSlotSerializer, IncidenceScooterSerializer, NotificationSerializer

class IncidenceSlotView(viewsets.GenericViewSet):

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAdmin]
        return super(IncidenceSlotView, self).get_permissions()

    def getSlotsIncidents(self, request):
        incidents = IncidenceSlot.objects.all()
        incidents_serializer = IncidenceSlotSerializer(incidents, many=True)
        return Response(incidents_serializer.data)

    def post(self, request):
        data = request.data['slot_incidence']
        serializer_context = {
            'username': request.user,
            'slot_id': data['slot_id'],
            'title': data['title'],
            'desc': data['desc'],
        }
        incident = IncidenceSlotSerializer.create(serializer_context)
        return Response(IncidenceSlotSerializer.to_incident(incident))

