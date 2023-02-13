from django.urls import path
from .views import RentView, RentAdminView

urlpatterns = [
    path('rent/<int:slot_id>', RentView.as_view({"post": "rent"})),
    path('rent', RentView.as_view({"get": "getOneRent"})),
    path('bringbackScooter', RentView.as_view({"post": "bringbackScooter"})),
    
    path('rentDashboard', RentAdminView.as_view({"get": "getAll"})),
    path('rentDashboard/<int:id>', RentAdminView.as_view({"delete": "delete"})),
]
