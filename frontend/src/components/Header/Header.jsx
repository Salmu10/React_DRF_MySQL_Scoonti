import React, { useContext } from "react";
import './Header.scss';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";

export default function Header () {
    const navigate = useNavigate();
    const { user, isAuth, isAdmin, logout } = useContext(AuthContext);
    const { notificationsNumber } = useNotifications();

    const redirects = {
        home: () => navigate('/home'),
        rent: () => navigate('/rent'),
        dashboard: () => navigate('/dashboard'),
        login: () => navigate('/login'),
        register: () => navigate('/register'),
        profile: (id) => navigate('/profile/' + id),
    }

    const isUser = isAuth ? <li className="link" onClick={() => logout()}>Log out</li>
    : <li className="link" onClick={() => redirects.register()}>Sign up</li>;

    const isUsername = isAuth ? <li className="link position-relative" onClick={() => redirects.profile(user.id)}>{user.username}<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{notificationsNumber}</span></li>
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
                    </ul>
                </nav>
            </div>
        </header>
    )
}