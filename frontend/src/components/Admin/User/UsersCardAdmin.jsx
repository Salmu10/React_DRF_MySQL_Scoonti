import React from 'react';
import './UsersCardAdmin.scss';

export default function UsersCardAdmin ({ user, index, deleteUser }) {

    return (
        <tr>
            <td className="id_col">{user.id}</td>
            <td>{user.uuid}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.type}</td>
            <td> 
                <button className="buttons" onClick={() => deleteUser(user.uuid)}>Delete</button>
            </td>
        </tr>
    )
}