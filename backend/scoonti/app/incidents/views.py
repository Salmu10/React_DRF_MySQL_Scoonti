from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import (IsAuthenticated, AllowAny)
from scoonti.app.core.permissions import IsAdmin
from .models import Incident
from .serializers import IncidenceSlotSerializer, IncidenceScooterSerializer, NotificationSerializer

class IncidenceSlotView(viewsets.GenericViewSet):

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAdmin]
        return super(IncidenceSlotView, self).get_permissions()

