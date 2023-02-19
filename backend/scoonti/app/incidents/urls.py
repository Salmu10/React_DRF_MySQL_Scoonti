from django.urls import path
from .views import IncidenceSlotView, IncidenceScooterView, IncidentsView, NotificationsView

urlpatterns = [
    # INCIDENTS
    path('slots_incidents', IncidentsView.as_view({"get": "getAllIncidentsSlots"})),
    path('scooters_incidents', IncidentsView.as_view({"get": "getAllIncidentsScooters"})),
    path('slot_incidence/<str:id>', IncidentsView.as_view({"put": "updateIncidenceSlot"})),
    path('scooter_incidence/<str:id>', IncidentsView.as_view({"put": "updateIncidenceScooter"})),
    path('slot_incidence/<str:id>', IncidentsView.as_view({"delete": "deleteIncidenceSlot"})),
    path('scooter_incidence/<str:id>', IncidentsView.as_view({"delete": "deleteIncidenceScooter"})),

    # SLOT INCIDENTS
    path('slot_incidents', IncidenceSlotView.as_view({"get": "getSlotsIncidents"})),
    path('slot_incidents/<str:id>', IncidenceSlotView.as_view({"get": "getOneSlotIncidence"})),
    path('slot_incidence', IncidenceSlotView.as_view({"post": "post"})),
    path('slot_incidence', IncidenceSlotView.as_view({"delete": "delete"})),

    # SCOOTER INCIDENTS
    path('scooter_incidents', IncidenceScooterView.as_view({"get": "getScootersIncidents"})),
    path('scooter_incidents/<str:id>', IncidenceScooterView.as_view({"get": "get"})),
    path('scooter_incidence', IncidenceScooterView.as_view({"post": "post"})),

    # NOTIFICATIONS
    path('notifications', NotificationsView.as_view({"get": "get"})),
    path('notifications/<int:id>', NotificationsView.as_view({"put": "seenNotification"})),
]
