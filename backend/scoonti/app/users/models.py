from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.conf import settings
from datetime import datetime, timedelta
import jwt

class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.CharField('uuid', max_length=36, unique=True, editable=False, null=False)
    username = models.CharField('username', max_length=30, unique=True, null=False)
    email = models.EmailField('email', unique=True)
    type = models.CharField('type', max_length=10, null=False, default='client')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    @property
    def token(self):
        return self.generate_token_jwt()

    def generate_token_jwt(self):
        dt = datetime.now() + timedelta(minutes=60)

        token = jwt.encode({'username': self.username, 'exp': int(dt.strftime('%S'))
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')