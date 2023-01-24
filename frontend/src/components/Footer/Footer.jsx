import React from "react";
import './Footer.scss';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <h3>Scoonti</h3>
            </div>
            <div className="footer-bottom">
                <p>Copyright <span id="year">2023</span></p>
                <div className="footer-menu">
                    <p>Salva Muñoz Úbeda</p>
                </div>
            </div>
        </footer>
    )
}