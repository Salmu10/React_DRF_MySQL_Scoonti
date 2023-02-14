from random import randint
import django
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scoonti.settings')
django.setup()
from scoonti.app.stations.serializers import StationSerializer, ScooterSerializer, SlotSerializer

stations_name = ["L'estació Station", "Jaume I Station", "Sant Rafael Staion", "Polideportivo Station", "El Teler Station"]
stations_latitude = [38.810110519255254, 38.82172053366386, 38.82593542292847, 38.81333890018974, 38.82427600593147]
stations_longitude = [-0.6047567310730674, -0.5980932125218063, -0.6137625255400939, -0.6091280620636682, -0.6032185939310202]
stations_image = ["Estacion_1.jpg", "Estacion_2.jpg", "Estacion_3.jpg", "Estacion_4.jpg", "Estacion_5.jpg"]
status = ['in_use', 'vacant']

def create_scooter(n):
    for i in range(n):
        scooter = {
            'status': 'in_use',
            'name': 'Scooter ' + str((i + 1))
        }
        serializer = ScooterSerializer(data=scooter)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

def create_stations(n, n_slot):
    for i in range(n):
        station = {
            'name': str(stations_name[i]),
            'status': 'active',
            'image': stations_image[i],
            'latitude': stations_latitude[i],
            'longitude': stations_longitude[i]
        }
        serializer = StationSerializer(data=station)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        for j in range(n_slot):
            slot_context = {'station_id': serializer.data['id'], 'status': status[randint(0, len(status)-1)], 'slot_number': j}
            SlotSerializer.create_slot_dummys(context=slot_context)


if __name__ == '__main__':
    print('Dummys start')
    create_scooter(50)
    create_stations(5, 10)
    print('Dummys end')
