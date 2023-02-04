from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import userSerializer
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser)

class UserView(viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    def register(self, request):
        data = request.data['user']

        serializer_context = {
            'username': data['username'],
            'email': data['email'],
            'password': data['password']
        }

        serializer = userSerializer.register(serializer_context)
        ProfileSerializer.create(context=serializer['user'])
        return Response(serializer)

    def login(self, request):
        data = request.data['user']

        serializer_context = {
            'username': data['username'],
            'password': data['password']
        }
        
        serializer = userSerializer.login(serializer_context)
        return Response(serializer)

class UserInfoView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def getUser(self, request):
        username = request.user

        serializer_context = { 'username': username }
        serializer = userSerializer.getUser(context=serializer_context)

        return Response(serializer)

    def logout(self, request):

        return Response()

class ProfileView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def getProfile(self, request, id):
        profile = Profile.objects.get(user_id=id)
        # print(profile)
        profile_serializer = ProfileSerializer(profile, many=False)
        return Response(profile_serializer.data)

    def put(self, request, id):
        profile_data = request.data
        return Response(profile_data)
  
    def delete(self, request, id):
        profile = Profile.objects.get(id=id)
        # profile.delete()
        # return Response({'data': 'Profile deleted successfully'})
        return Response(profile)