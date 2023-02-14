import React from 'react';
import SlotCard from './SlotCard';
import StationMap from '../Map/StationMap';

export default function SlotsList ({ station, slots }) {

    return  (
        <div className="slots_container">
            <div className="title">
                <h2>Rent a Scooter</h2>
                <h3>{station.name}</h3>
            </div>
            <div className="slots_cards-list">
                {
                    slots.map(( slot, index ) => (
                        <SlotCard key={index} slot={slot}/>
                    ))
                }
            </div>
            <div className="station_map">
                <StationMap station={station}/>
            </div>
        </div>
    )
}