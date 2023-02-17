import React from 'react';
import './IncidentsCardAdmin.scss';

export default function IncidentsCardAdmin ({ incidence, index, deleteIncidence, type }) {

    const id = type == 'slot' ? incidence.slot_id : incidence.scooter_id

    return (
        <tr>
            <td className="id_col">{incidence.id}</td>
            <td>{incidence.title}</td>
            <td>{incidence.status}</td>
            <td>{incidence.desc}</td>
            <td>{id}</td>
            <td>{incidence.user_id}</td>
            <td> 
                <button className="buttons" onClick={() => deleteIncidence(type, incidence.id)}>Delete</button>
            </td>
        </tr>
    )
}