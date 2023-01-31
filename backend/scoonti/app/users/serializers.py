from rest_framework import serializers
from .models import User

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('password', 'email', 'username', 'type')

    def register(context):
        username = context['username']
        email = context['email']
        password = context['password']

        username_exist = len(User.objects.filter(username=username))
        email_exist = len(User.objects.filter(email=email))
        if (email_exist > 0 or username_exist > 0):
            raise serializers.ValidationError('Username or email already exists.')

        user = User.objects.create(
            username = username,
            email = email, 
            password = password, 
            type = 'client'
        )

        return {
            'user': {
                'username': user.username,
                'email': user.email,
                'type': user.type
            },
            'token': user.token,
        }

    def login(context):
        username = context['username']
        password = context['password']

        try:
            user = User.objects.get(username=username)
        except:
            raise serializers.ValidationError('User not found.')

        return {
            'user': {
                'username': user.username,
                'email': user.email,
                'type': user.type
            },
            'token': user.token
        }
