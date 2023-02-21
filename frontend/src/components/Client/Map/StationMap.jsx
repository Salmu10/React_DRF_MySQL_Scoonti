import React, { useState } from 'react';
import Map, { GeolocateControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./StationsMap.scss";

export default function StationMap({ station = [] }) {

    const lat = station.latitude != '' ? station.latitude : 38.820219 ;
    const long = station.longitude != '' ? station.longitude : -0.603869;
    
    return (
        <div className="maps_content">
            <Map
                mapboxAccessToken="pk.eyJ1Ijoic2FsbXUxMCIsImEiOiJjbGRqNmZpZ2wxbDM5M3BwaXBmZXNpaGR3In0.6uyL22hZV1D-Z0yiM-hgew"
                initialViewState={{ longitude: long, latitude: lat, zoom: 15 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true}/>

                <Marker key={station.id} latitude={station.latitude} longitude={station.longitude} color={"#008f88"}/>
            </Map>
        </div>
    );
}