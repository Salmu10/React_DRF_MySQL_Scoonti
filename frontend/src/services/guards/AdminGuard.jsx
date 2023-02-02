import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

function AdminGuard() {
    const { isAdmin } = useContext(AuthContext);

    return isAdmin ? <Outlet/> : <Navigate to="/home"/>
}

export default AdminGuard;