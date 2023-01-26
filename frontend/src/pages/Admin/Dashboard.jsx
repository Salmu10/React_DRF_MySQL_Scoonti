import React from "react";
import './Dashboard.scss';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const redirects = {
        stations: () => navigate('/dashboard/stations'),
        slots: () => navigate('/dashboard/slots'),
        scooters: () => navigate('/dashboard/scooters'),
    }
    
    return (
        <div className="dashboard_container">
            <h1>Dashboard</h1>
            <div className="buttons_box">
                <button className="button" onClick={() => redirects.stations()}><span>Stations List</span></button>
                <button className="button" onClick={() => redirects.slots()}><span>Slots List</span></button>
                <button className="button" onClick={() => redirects.scooters()}><span>Scooter List</span></button>
            </div>
        </div>
    )
}

export default Dashboard