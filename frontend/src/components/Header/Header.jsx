import React from "react";
import './Header.scss';
import { useNavigate } from "react-router-dom";

export default function Header () {
    const navigate = useNavigate();

    const redirects = {
        home: () => navigate('/home'),
        rent: () => navigate('/rent'),
        dashboard: () => navigate('/dashboard'),
    }

    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <img src="/assets/Logo.png" alt="logo"/>
                </div>
                <nav>
                    <div className="nav_buttons">
                        <a className="link" onClick={() => redirects.home()}>Home</a>
                        <a className="link" onClick={() => redirects.rent()}>Rent</a>
                        <a className="link" onClick={() => redirects.dashboard()}>Dashboard</a>
                        {/* <a className="link" src="#">Home</a> */}
                        {/* <a className="link" src="#">Rent</a> */}
                    </div>
                </nav>
            </div>
        </header>
    )
}