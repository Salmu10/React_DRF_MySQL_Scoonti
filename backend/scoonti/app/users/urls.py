from django.urls import path
from .views import UserView, UserInfoView
from .views import ProfileView

urlpatterns = [
    # Users
    path('register', UserView.as_view({'post': 'register'})),
    path('login', UserView.as_view({'post': 'login'})),
    path('user', UserInfoView.as_view({'get': 'getUser'})),

    # Profile
    path('profile/<str:id>', ProfileView.as_view({'get': 'getProfile'})),
    path('profile/<str:id>', ProfileView.as_view({'put': 'put'})),
    path('scooter/<str:slug>', ProfileView.as_view({'delete': 'delete'})),
]