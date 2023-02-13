from django.urls import path
from .views import StationView
from .views import ScooterView
from .views import SlotView

urlpatterns = [
    # Stations
    path('station', StationView.as_view({'get': 'getStations'})),
    path('station/<str:slug>', StationView.as_view({'get': 'getOneStation'})),
    path('station', StationView.as_view({'post': 'post'})),
    path('station/<str:slug>', StationView.as_view({'put': 'put'})),
    path('station/<str:slug>', StationView.as_view({'delete': 'delete'})),

    # Scooters
    path('scooter', ScooterView.as_view({'get': 'getScooters'})),
    path('scooter/<str:slug>', ScooterView.as_view({'get': 'getOneScooter'})),
    path('scooter', ScooterView.as_view({'post': 'post'})),
    path('scooter/<str:slug>', ScooterView.as_view({'put': 'put'})),
    path('scooter/<str:slug>', ScooterView.as_view({'delete': 'delete'})),

    # Slots
    path('slot', SlotView.as_view({'get': 'getSlots'})),
    path('slot/<int:id>', SlotView.as_view({"get": "getOneSlot"})),
]