import React from 'react';

import StationCard from './StationCard';

export default function StationsList ({ stations }) {

    return  (
        <div className="stations_cards-list">
            {
                stations.map(( station, index ) => (
                    station.status === "active" ? <StationCard key={index} station={station}/> : ""
                ))
            }
        </div>
    )
}