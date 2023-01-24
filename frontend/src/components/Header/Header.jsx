import React from "react";
import './Header.scss';

export default function Header () {
    return (
        <header>
            <div class="header-container">
                <div class="logo">
                    <img src="../../assets/Logo_Salmu.png" alt="logo"/>
                </div>
                <nav>
                    <div class="nav_buttons">
                        <a class="link" src="#">Home</a>
                        <a class="link" src="#">Rent</a>
                    </div>
                </nav>
            </div>
        </header>
    )
}