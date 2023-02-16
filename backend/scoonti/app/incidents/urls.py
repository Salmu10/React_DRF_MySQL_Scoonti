from django.urls import path
from .views import IncidenceSlotView, IncidenceScooterView

urlpatterns = [
    # SLOT INCIDENTS
    path('slot_incidents', IncidenceSlotView.as_view({"get": "getSlotsIncidents"})),
    path('slot_incidents/<str:id>', IncidenceSlotView.as_view({"get": "getOneSlotIncidence"})),
    path('slot_incidence', IncidenceSlotView.as_view({"post": "post"})),

    # SCOOTER INCIDENTS
    path('scooter_incidents', IncidenceScooterView.as_view({"get": "getScootersIncidents"})),
    path('scooter_incidents/<str:id>', IncidenceScooterView.as_view({"get": "get"})),
    path('scooter_incidence', IncidenceScooterView.as_view({"post": "post"})),
]
