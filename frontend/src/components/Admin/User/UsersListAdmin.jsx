import React from 'react';
import './UsersListAdmin.scss';
import UsersCardAdmin from './UsersCardAdmin';

export default function UsersListAdmin ({ users, deleteUser }) {

    return  (
        <div className="users_list_container">
            <h1>Users List</h1>
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