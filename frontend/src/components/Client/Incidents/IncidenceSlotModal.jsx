import React, { useEffect } from "react";
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import './IncidenceSlotModal.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIncidents } from "../../../hooks/useIncidents";
import { useNavigate } from "react-router-dom";
Modal.setAppElement('#root');

export default function IncidenceSlotModal ({ openModal, setOpenModal, incidenceType, id }) {
    const navigate = useNavigate();
    const { isCorrect, useAddSlotIncidence, useAddScooterIncidence } = useIncidents();

    const validators = Yup.object().shape({
        title: Yup.string().required('*Title is required').min(3, '*Title must be at least 3 characters').max(50, '*Title must be at most 50 characters'),
        desc: Yup.string().required('*Description is required').min(3, '*Description must be at least 3 characters').max(300, '*Description must be at most 300 characters'),
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(validators) });

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(150, 150, 150, 0.75)',
            zIndex: '999',
            border: 'none'
        }
    };

    const onSubmit = data => {
        if (incidenceType == 'slot') {
            data.slot_id = id;
            useAddSlotIncidence(data);
        } else {
            data.scooter_id = id;
            useAddScooterIncidence(data);
        }

    }

    const handleClose = () => {
        setOpenModal(false);
        setValue('title', '');
        setValue('desc', '');
    }

    useEffect(() => {
        if (isCorrect) {
            navigate('/home');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="modal">
            <Modal className="incidenceSlotModal" isOpen={openModal} onRequestClose={() => handleClose()} style={customStyles}>
                <form className='incidence_slot_form' onSubmit={handleSubmit(onSubmit)}>
                    <button onClick={() => handleClose()}>
                        <FontAwesomeIcon className="cross_button" icon="fa-solid fa-square-xmark"/>
                    </button>
                    <h1>Incidence on {incidenceType} {id}</h1>
                    <div className='attribute_box'>
                        <label htmlFor="title" className='etiqueta'>Title:</label>
                        <input type="text" id="title" {...register('title')} placeholder="Write the title there"/><br/>
                        <span className="error">{errors.title?.message}</span>
                    </div>
                    <div className='attribute_box'>
                        <label htmlFor="title" className='etiqueta'>Description:</label>
                        <textarea type="text" rows={3} id="desc" {...register('desc')} placeholder="Describe the problem there"/><br/>
                        <span className="error">{errors.desc?.message}</span>
                    </div>
                    <div className='buttons_box'>
                        <button type="submit" className="btn btn-primary">Send</button>
                        <button type="button" className="btn btn-danger" onClick={() => handleClose()}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}