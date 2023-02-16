from django.urls import path
from .views import IncidenceSlotView

urlpatterns = [
    # SLOT INCIDENTS
    path('slot_incidents', IncidenceSlotView.as_view({"get": "getSlotsIncidents"})),
    path('slot_incidents/<str:id>', IncidenceSlotView.as_view({"get": "get"})),
    path('slot_incidence', IncidenceSlotView.as_view({"post": "post"})),
]
