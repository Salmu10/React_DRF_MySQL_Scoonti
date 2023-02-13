import './SlotCard.scss';
import React, { useState, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import { useRent } from "../../../hooks/useRent";

export default function SlotCard ({ slot }) {
    const { isAuth } = useContext(AuthContext);
    const { useRentScooter, useBringBackScooter } = useRent();

    const img_background = slot.status === 'in_use' ? 'green' : slot.status === 'vacant' ? 'red' : 'yellow';
    const slot_status = slot.status === 'in_use' ? 'In use' : slot.status === 'vacant' ? 'Vacant' : 'Maintenance';

    const rent_scooter = (slot) => {
        if (isAuth) {
            if (slot.status == 'in_use') {
                useRentScooter(slot);
            } else {
                useBringBackScooter(slot);
            }
        } else {
            console.log('login');
        }
    }

    return (
        <div className="card" onClick={() => { rent_scooter(slot) }}>
            <div className="card_image">
                <img src="/assets/scooter.png" style={{ backgroundColor: `${img_background}` }}/> 
            </div>
            <div className="card_title title-white">
                <p>{slot_status}</p>
            </div>
        </div>
    )
}