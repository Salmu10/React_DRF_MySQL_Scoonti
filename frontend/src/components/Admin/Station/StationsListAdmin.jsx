import React from 'react';
import './StationsListAdmin.scss';
import { useNavigate } from "react-router-dom";

import StationsCardAdmin from './StationsCardAdmin';

export default function StationsListAdmin ({ stations, deleteStation }) {

    const navigate = useNavigate();

    const redirects = {
        add_station: () => navigate('/dashboard/stations/add'),
    }

    return  (
        <div className="stations_list_container">
            <h1>Stations List</h1>
            <button className="button add_button" onClick={() => redirects.add_station()}>Add station</button>
            <table className="table" border="1">
                <thead className="thead_stations_list">
                    <tr>
                        <th>ID</th>
                        <th>slug</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Slots</th>
                        <th>Scooters</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="tbody_stations_list">
                    {
                        stations.map(( station, index ) => (
                            <StationsCardAdmin key={index} station={station} deleteStation={deleteStation}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}