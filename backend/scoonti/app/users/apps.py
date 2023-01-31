from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'scoonti.app.users'

    def ready(self):
            import scoonti.app.users.signals