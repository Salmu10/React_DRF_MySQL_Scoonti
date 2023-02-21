import React from 'react';
// import './ScootersListAdmin.scss';
import { useNavigate } from "react-router-dom";

import ScootersCardAdmin from './ScootersCardAdmin';

export default function ScootersListAdmin ({ scooters, deleteScooter }) {

    const navigate = useNavigate();

    const redirects = {
        add_scooter: () => navigate('/dashboard/scooters/add'),
    }

    return  (
        <div className="scooters_list_container">
            <h1>Scooters List</h1>
            <button className="button add_button" onClick={() => redirects.add_scooter()}>Add scooter</button>
            <table className="table" border="1">
                <thead className="thead_scooters_list">
                    <tr>
                        <th>ID</th>
                        <th>slug</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="tbody_scooters_list">
                    {
                        scooters.map(( scooter, index ) => (
                            <ScootersCardAdmin key={index} scooter={scooter} deleteScooter={deleteScooter}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}