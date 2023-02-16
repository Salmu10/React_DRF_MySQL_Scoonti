from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from scoonti.app.core.permissions import IsAdmin
from .models import IncidenceSlot, IncidenceScooter
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

        incidence = IncidenceSlotSerializer.create(serializer_context)
        return Response(IncidenceSlotSerializer.to_incidence_slot(incidence))

class IncidenceScooterView(viewsets.GenericViewSet):

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAdmin]
        return super(IncidenceScooterView, self).get_permissions()

    def getScootersIncidents(self, request):
        incidents = IncidenceScooter.objects.all()
        incidents_serializer = IncidenceScooterSerializer(incidents, many=True)
        return Response(incidents_serializer.data)

    def post(self, request):
        data = request.data['scooter_incidence']

        serializer_context = {
            'username': request.user,
            'scooter_id': data['scooter_id'],
            'title': data['title'],
            'desc': data['desc'],
        }

        incidence = IncidenceScooterSerializer.create(serializer_context)
        return Response(IncidenceScooterSerializer.to_incidence_scooter(incidence))

class NotificationsView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications_serializer = NotificationSerializer.getUserNotification(request.user)
        notifications = NotificationSerializer(notifications_serializer, many=True)
        return Response(notifications.data)

    def seenNotification(self, request, id):
        serializer_context = { 'username': request.user, 'id': id }
        serializer = NotificationSerializer.seeNotification(context=serializer_context)
        return Response(NotificationSerializer.to_notification(serializer))
