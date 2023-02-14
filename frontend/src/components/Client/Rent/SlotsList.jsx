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
            <div className='leyenda'>
                <div className='slot_verde'>
                    <div className="cuadrado_verde"></div>
                    <p className='texto_verde'>Slot with a scooter ready to rent</p>
                </div>
                <div className='slot_rojo'>
                    <div className="cuadrado_rojo"></div>
                    <p className='texto_rojo'>Slot where you can bring back the scooter</p>
                </div>
                <div className='slot_amarillo'>
                    <div className="cuadrado_amarillo"></div>
                    <p className='texto_amarillo'>Slot in maintenance</p>
                </div>
            </div>
            <div className="slots_cards-list">
                {
                    slots.map(( slot, index ) => (
                        <SlotCard key={index} slot={slot}/>
                    ))
                }
            </div>
            {/* <div className="station_map">
                <StationMap station={station}/>
            </div> */}
        </div>
    )
}