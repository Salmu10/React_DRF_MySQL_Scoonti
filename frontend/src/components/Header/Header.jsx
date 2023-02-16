import React, { useContext } from "react";
import './Header.scss';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";

export default function Header () {
    const navigate = useNavigate();
    const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
    // const { useLogout } = useAuth();

    const redirects = {
        home: () => navigate('/home'),
        rent: () => navigate('/rent'),
        dashboard: () => navigate('/dashboard'),
        login: () => navigate('/login'),
        register: () => navigate('/register'),
        profile: (id) => navigate('/profile/' + id),
        notifications: () => navigate('/notifications'),
    }

    const isUser = isAuth ? <li className="link" onClick={() => logout()}>Log out</li>
    : <li className="link" onClick={() => redirects.register()}>Sign up</li>;

    const isUsername = isAuth ? <li className="link" onClick={() => redirects.notifications()}>{user.username}</li>
    : <li className="link" onClick={() => redirects.login()}>Sign in</li>;

    const isAdminUser = isAdmin ? <a className="link" onClick={() => redirects.dashboard()}>Dashboard</a> : '';

    return (
        <header>
            <div className="header-container">
                <div className="logo" onClick={() => redirects.home()}>
                    <img src="/assets/Logo.png" alt="logo"/>
                </div>
                <nav>
                    <ul className="nav_buttons">
                        <li className="link" onClick={() => redirects.home()}>Home</li>
                        <li className="link" onClick={() => redirects.rent()}>Rent</li>
                        {isAdminUser}
                        {isUsername}
                        {isUser}
                        {/* <a className="link" onClick={() => redirects.dashboard()}>Dashboard</a> */}
                        {/* <a className="link" onClick={() => redirects.login()}>Login</a> */}
                        {/* <a className="link" onClick={() => redirects.register()}>Register</a> */}
                    </ul>
                </nav>
            </div>
        </header>
    )
}