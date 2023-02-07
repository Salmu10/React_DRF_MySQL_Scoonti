import './StationCard.scss';
import React, { useState } from 'react';

export default function StationCard ({ station }) {
    // console.log(station);
    return (
        <div className="card 1">
            <div className="card_image">
                <img src="/assets/estacion.jpeg"/> 
            </div>
            <div className="card_title title-white">
                <p>{station.name}</p>
            </div>
        </div>
        
        // <div className="card w-96 bg-base-100">
        //     <figure>
        //     { station.image != null ? "hola image" : "Hola no image" } 
        //     </figure>
        //     <div className="card-body">
        //         <h2 className="card-title font-bold text-xl">{station.name}</h2>
        //     </div>
        // </div>
    )
}