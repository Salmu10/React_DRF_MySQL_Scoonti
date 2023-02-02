import React, { useState } from 'react';
import Map, { GeolocateControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./StationsMap.scss"

export default function StationsMap({ stations = [], setShow }) {
    const [markerIndex, setMarkerIndex] = useState(null);

    const button_click = id => {
        // console.log(id);
        // console.log(markerIndex);
    }

    return (
        <div className="maps_content">
            <Map
                mapboxAccessToken="pk.eyJ1Ijoic2FsbXUxMCIsImEiOiJjbGRqNmZpZ2wxbDM5M3BwaXBmZXNpaGR3In0.6uyL22hZV1D-Z0yiM-hgew"
                initialViewState={{ longitude: -0.603869, latitude: 38.820219, zoom: 13.5 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true}/>

                {stations.map((station, id) => {
                    return <Marker key={id} latitude={station.latitude} longitude={station.longitude} color={"#008f88"}/>
                })}

                {stations.map((station, id) => (
                    <Marker key={id} latitude={station.latitude} longitude={station.longitude} color={"#008f88"}>
                        <button className="marker_button" onClick={() => { setMarkerIndex(id); button_click(id); setShow(stations[id].id)}}>
                            <div style={{ backgroundColor: 'transparent', width: 25, height: 50, borderRadius: '50%' }}/>
                        </button>
                    </Marker>                
                ))}

                {markerIndex !== null && (
                    <Popup latitude={stations[markerIndex].latitude} longitude={stations[markerIndex].longitude} closeButton={true} closeOnClick={false} 
                        onClose={() => { setMarkerIndex(null); setShow(null) }} anchor="top">
                        <div className="text-black">
                            {stations[markerIndex].slug}
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}