import React, { useState } from 'react';

export default function StationsCard ({ station }) {
    // console.log(station);
    return (
        
        <div className="card w-96 bg-base-100">
            <figure>
            { station.image != null ? "hola image" : "Hola no image" } 
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-xl">{station.name}</h2>
            </div>
        </div>
    )
}