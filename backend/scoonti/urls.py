from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('scoonti.app.stations.urls')),
    path('api/', include('scoonti.app.users.urls')),
    path('api/', include('scoonti.app.rent.urls')),
    path('api/', include('scoonti.app.incidents.urls')),
]