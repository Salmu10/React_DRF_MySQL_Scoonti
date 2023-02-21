import React from 'react';
// import './UsersListAdmin.scss';
import { useNavigate } from "react-router-dom";

import UsersCardAdmin from './UsersCardAdmin';

export default function UsersListAdmin ({ users, deleteUser }) {

    const navigate = useNavigate();

    // const redirects = {
    //     add_user: () => navigate('/home'),
    // }

    return  (
        <div className="users_list_container">
            <h1>Users List</h1>
            {/* <button className="button add_button" onClick={() => redirects.add_scooter()}>Add scooter</button> */}
            <table className="table" border="1">
                <thead className="thead_users_list">
                    <tr>
                        <th>ID</th>
                        <th>Uuid</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="tbody_users_list">
                    {
                        users.map(( user, index ) => (
                            <UsersCardAdmin key={index} user={user} deleteUser={deleteUser}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}