from django.urls import path
from .views import StationView

urlpatterns = [
    path('station', StationView.as_view({'get': 'getStations'})),
    path('station/<str:slug>', StationView.as_view({'get': 'getOneStation'})),
    path('station', StationView.as_view({'post': 'createStation'})),
    path('station/<str:slug>', StationView.as_view({'put': 'put'})),
]