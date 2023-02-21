import './SlotCard.scss';
import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../../../context/AuthContext";
import { useRent } from "../../../hooks/useRent";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IncidenceSlotModal from "../Incidents/IncidenceSlotModal";

export default function SlotCard ({ slot }) {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const { isCorrect, useRentScooter, useBringBackScooter } = useRent();
    const [openModal, setOpenModal] = useState(false);
    const [modalSlot, setModalSlot] = useState(null);

    const incidence_type = 'slot';

    const img_background = slot.status === 'in_use' ? '#27EE27' : slot.status === 'vacant' ? '#FF1818' : '#FFFF37';
    const slot_status = slot.status === 'in_use' ? 'Scooter available' : slot.status === 'vacant' ? 'Vacant' : 'Maintenance';

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

    useEffect(() => {
        if (isCorrect) {
            navigate('/home');
        }
    }, [isCorrect, navigate]);

    const report = slot_id => {
        setOpenModal(true);
        setModalSlot(slot_id);
    }

    return (
        <div className="slot">
            <div className="card" onClick={() => { rent_scooter(slot) }}>
                <div className="card_image">
                    <img src="/assets/scooter.png" style={{ backgroundColor: `${img_background}` }}/> 
                </div>
                <div className="card_title">
                    <p>Slot: {slot.slot_number}</p>
                    <p>{slot_status}</p>
                </div>
            </div>
            <div className="report">
                <p className="report_button" onClick={() => report(slot.id)}>
                    <FontAwesomeIcon className='icon' icon="fa-solid fa-circle-exclamation"/>
                    Report an incidence
                </p>
            </div>
            <IncidenceSlotModal openModal={openModal} setOpenModal={setOpenModal} incidenceType={incidence_type} id={modalSlot}/>
        </div>
    )
}