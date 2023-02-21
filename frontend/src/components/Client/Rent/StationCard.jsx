import './StationCard.scss';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function StationCard ({ station }) {
    const navigate = useNavigate();

    const redirects = {
        details: (slug) => navigate('/stations/' + slug),
    }

    return (
        <div>
            <div className="card_title">
                <p>{station.name}</p>
            </div>
            <div className="card 1" onClick={() => redirects.details(station.slug)}>
                <div className="card_image">
                    <img src="/assets/estacion.jpeg"/> 
                </div>

            </div>
        </div>
    )
}