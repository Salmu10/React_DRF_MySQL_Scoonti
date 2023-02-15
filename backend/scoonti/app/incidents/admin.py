from django.contrib import admin
from .models import IncidentSlot, IncidentScooter, Notification

admin.site.register(IncidentSlot)
admin.site.register(IncidentScooter)
admin.site.register(Notification)
