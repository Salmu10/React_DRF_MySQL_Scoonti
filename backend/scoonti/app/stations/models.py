from django.db import models

# Create your models here.

class Station(models.Model):

    slug = models.SlugField(max_length=100, unique=True, editable=False)
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=30, decimal_places=9, null=False)
    longitude = models.DecimalField(max_digits=30, decimal_places=9, null=False)

    def __str__(self):
        return str(self.id)