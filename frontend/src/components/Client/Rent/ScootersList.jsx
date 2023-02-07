import React from 'react';

import ScooterCard from './ScooterCard';

export default function ScootersList ({ scooters }) {

    return  (
        <div className="scooters_cards-list">
            {
                scooters.map(( scooter, index ) => (
                    scooter.status === "active" ? <ScooterCard key={index} scooter={scooter}/> : ""
                ))
            }
        </div>
    )
}