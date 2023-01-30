import React from 'react';
import { useNavigate } from "react-router-dom";
import './ScootersCardAdmin.scss';

export default function ScootersCardAdmin ({ scooter, index, deleteScooter }) {

    const navigate = useNavigate();

    const redirects = {
        update: (slug) => navigate('/dashboard/scooters/update/' + slug),
    }

    return (
        <tr>
            <td className="id_col">{scooter.id}</td>
            <td>{scooter.slug}</td>
            <td>{scooter.name}</td>
            <td>{scooter.status}</td>
            <td> 
                <button className="buttons" onClick={() => redirects.update(scooter.slug)}>Edit</button>
                <button className="buttons" onClick={() => deleteScooter(scooter.slug)}>Delete</button>
            </td>
        </tr>
    )
}