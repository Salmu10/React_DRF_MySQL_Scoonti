from django.db import models
from scoonti.app.users.models import User
from scoonti.app.stations.models import Slot, Scooter

class IncidenceSlot(models.Model):

    title = models.CharField(max_length=30)
    status = models.CharField(max_length=100, default='pendiente')
    desc = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_incident")
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name="slot_affected")

    def __str__(self):
        return str(self.id)

class IncidenceScooter(models.Model):

    title = models.CharField(max_length=30)
    status = models.CharField(max_length=100, default='pendiente')
    desc = models.CharField(max_length=300)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="incident_user")
    scooter = models.ForeignKey(Scooter, on_delete=models.CASCADE, related_name="scooter_affected")

    def __str__(self):
        return str(self.id)

class Notification(models.Model):

    seen = models.BooleanField(default=False)
    desc = models.CharField(max_length=300)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_notification")

    def __str__(self):
        return str(self.id)
