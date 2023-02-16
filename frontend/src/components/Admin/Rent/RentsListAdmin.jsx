import React from 'react';
import './RentsListAdmin.scss';
import { useNavigate } from "react-router-dom";

import RentsCardAdmin from './RentsCardAdmin';

export default function RentsListAdmin ({ rents, deleteRent }) {

    const navigate = useNavigate();

    // const redirects = {
    //     add_user: () => navigate('/home'),
    // }

    return  (
        <div className="rents_list_container">
            <h1>Rents List</h1>
            {/* <button className="button add_button" onClick={() => redirects.add_scooter()}>Add scooter</button> */}
            <table className="table" border="1">
                <thead className="thead_rents_list">
                    <tr>
                        <th>ID</th>
                        <th>Initial Date</th>
                        <th>End Date</th>
                        <th>End Slot</th>
                        <th>Initial Slot</th>
                        <th>Scooter</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="tbody_rents_list">
                    {
                        rents.map(( rent, index ) => (
                            <RentsCardAdmin key={index} rent={rent} deleteRent={deleteRent}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}