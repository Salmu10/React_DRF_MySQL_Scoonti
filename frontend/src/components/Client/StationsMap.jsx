import Map, { GeolocateControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./StationsMap.scss"

export default function StationsMap({ stations = [] }) {
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
                    // <Popup></Popup>
                })}
            </Map>
        </div>
    );
}