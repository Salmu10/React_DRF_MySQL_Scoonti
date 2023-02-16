import React from 'react';
import './RentsCardAdmin.scss';

export default function rentsCardAdmin ({ rent, index, deleteRent }) {

    const format_data = rent.end_date == null ? 'rented' : rent.end_date;

    return (
        <tr>
            <td className="id_col">{rent.id}</td>
            <td>{rent.initial_date}</td>
            <td>{format_data}</td>
            <td>{format_data}</td>
            <td>{rent.initial_slot_id}</td>
            <td>{rent.scooter_id}</td>
            <td>{rent.user_id}</td>
            <td> 
                <button className="buttons" onClick={() => deleteRent(rent.id)}>Delete</button>
            </td>
        </tr>
    )
}