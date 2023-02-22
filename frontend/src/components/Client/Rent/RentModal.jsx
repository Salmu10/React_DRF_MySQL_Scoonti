import React, { useEffect, useContext } from "react";
import Modal from 'react-modal';
import './RentModal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIncidents } from "../../../hooks/useIncidents";
import AuthContext from "../../../context/AuthContext";
import { useRent } from "../../../hooks/useRent";
import { useNavigate } from "react-router-dom";
Modal.setAppElement('#root');

export default function RentModal ({ openModalRent, setOpenModalRent, rent }) {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    const { isCorrect, useRentScooter, useBringBackScooter } = useRent();

    let status_type = '';

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(150, 150, 150, 0.75)',
            zIndex: '999',
            border: 'none'
        }
    };

    const handleClose = () => {
        setOpenModalRent(false);
    }

    if (rent != null) {
        status_type = rent.status === 'in_use' ? <p>You are going to rent a scooter</p>
        : <p>You are going to bring back the scooter</p>
    }

    const rent_scooter = () => {
        if (isAuth) {
            if (rent != null) {
                if (rent.status == 'in_use') {
                    useRentScooter(rent);
                } else {
                    useBringBackScooter(rent);
                }
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

    return (
        <div className="modal">
            <Modal className="rentModal" isOpen={openModalRent} onRequestClose={() => handleClose()} style={customStyles}>
                <div className="rent_box">
                    <button className="modal_button" onClick={() => handleClose()}>
                        <FontAwesomeIcon className="cross_button" icon="fa-solid fa-square-xmark"/>
                    </button>
                    {status_type}
                    <div className='buttons_box'>
                        <button type="button" className="btn btn-primary" onClick={() => { rent_scooter() }}>Accept</button>
                        <button type="button" className="btn btn-danger" onClick={() => handleClose()}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}