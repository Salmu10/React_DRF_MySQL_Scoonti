import React, { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import UsersListAdmin from "../../../components/Admin/User/UsersListAdmin";

const UsersList = () => {

    const {allUsers, useAllUsers, useDeleteUser} = useAuth();

    useEffect(() => {
        useAllUsers();
    }, []);

    return (
        <UsersListAdmin users={allUsers} deleteUser={useDeleteUser}/>
    )
}

export default UsersList;
