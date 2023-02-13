from django.db import models
from scoonti.app.users.models import User
from scoonti.app.stations.models import Scooter, Slot

class Rent(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    scooter = models.ForeignKey(Scooter, on_delete=models.CASCADE, related_name="scooter")
    initial_slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name="start_slot")
    end_slot = models.ForeignKey(Slot, on_delete=models.CASCADE, null=True, related_name="end_slot")
    initial_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.id)