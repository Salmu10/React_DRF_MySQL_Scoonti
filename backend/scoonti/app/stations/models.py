from django.db import models

# Create your models here.

class Station(models.Model):
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=30, decimal_places=20, null=False)
    longitude = models.DecimalField(max_digits=30, decimal_places=20, null=False)

    def __str__(self):
        return str(self.id)

class Scooter(models.Model):
    slug = models.SlugField(max_length=100, unique=True, editable=False)
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=100)

    def __str__(self):
        return str(self.id)

class Slot(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE, null=False, related_name="slots")
    scooter = models.OneToOneField(Scooter, on_delete=models.CASCADE, null=True, unique=True, related_name="slots")
    status = models.CharField(max_length=100)

    def __str__(self):
        return str(self.id)