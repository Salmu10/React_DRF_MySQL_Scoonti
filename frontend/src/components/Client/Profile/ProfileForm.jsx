import './ProfileForm.scss';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAuth } from "../../../hooks/useAuth";
import { useNotifications } from "../../../hooks/useNotifications";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IncidenceSlotModal from "../Incidents/IncidenceSlotModal";
import Notification from "../Notifications/Notification";

const ProfileForm = ({user, profile, sendData, errorMSG}) => {
    const { id } = useParams();
    const [edit, setEdit] = useState(true);
    const { useUserScooter, userScooter, error_scooterMSG, stats, useUserStats } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [modalScooter, setModalScooter] = useState(null);
    const { notifications, useSeeNotification } = useNotifications();

    const incidence_type = 'scooter';
    const isScooter = error_scooterMSG == '' ? false : true;

    const validators = Yup.object().shape({
        username: Yup.string().required('*Username is required').min(3, '*Username must be between 3 and 15 characters').max(15, '*Username must be between 3 and 15 characters'),
        email: Yup.string().email('*Email format invalid').required('*Email is required'),
        name: Yup.string(),
        surnames: Yup.string(),
        image: Yup.string().url('*Must be an url'),
        biography: Yup.string(),
    });

    const {register, handleSubmit, setValue, formState: {errors} } = useForm({resolver: yupResolver(validators)});

    useEffect(() => {
        if (user.id !== '') {
            setValue('username', user.username);
            setValue('email', user.email);
        }
        if (profile.id !== '') {
            setValue('name', profile.name);
            setValue('surnames', profile.surnames);
            setValue('image', profile.image);
            setValue('biography', profile.biography);
            setValue('stats', stats);
        }
        useUserScooter();
        useUserStats(id);
    }, [user, profile]);

    const send_data = data => {
        sendData(data);
    };

    const report = scooter_id => {
        setOpenModal(true);
        setModalScooter(scooter_id);
    }


    const notifications_html = notifications.length > 0 ?
        notifications.map(item => <Notification notification={item} key={item.id} seeNotification={useSeeNotification} />)
        : <p>No Notifications</p>;

    return (
        <div className='profile_page'>
            <form onSubmit={handleSubmit(send_data)}>
                <div className="profile">
                    <div className='profile_image'>
                        <img className='user_image' src={profile.image} alt=''/>
                        <input type="text" id="image" {...register('image')} disabled={edit}/>
                        <span className="error">{errors.image?.message}</span>
                    </div>
                    <div className='profile_user'>
                        <div className='attribute_box'>
                            <label htmlFor="username" className='etiqueta'>Username:</label>
                            <input type="text" id="username" {...register('username')} disabled={edit}/><br/>
                            <span className="error">{errors.username?.message}</span>
                        </div>
                        <div className='attribute_box'>
                            <label htmlFor="email" className='etiqueta'>Email:</label>
                            <input type="text" id="email" {...register('email')} disabled={edit}/><br/>
                            <span className="error">{errors.email?.message}</span>
                        </div>
                        <div className='attribute_box'>
                            <label htmlFor="name" className='etiqueta'>Name:</label>
                            <input type="text" id="name" {...register('name')} placeholder="Write your name here" disabled={edit}/><br/>
                            <span className="error">{errors.name?.message}</span>
                        </div>
                        <div className='attribute_box'>
                            <label htmlFor="surnames" className='etiqueta'>Surname:</label>
                            <input type="text" id="surnames" {...register('surnames')} placeholder="Write your surnames here" disabled={edit}/><br/>
                            <span className="error">{errors.surname?.message}</span>
                        </div>
                        <div className='attribute_box'>
                            <label htmlFor="stats" className='etiqueta'>Total times rented:</label>
                            <input type="text" id="stats" {...register('stats')} disabled={true}/><br/>
                        </div>
                        <div className="error_server">{errorMSG}</div>
                    </div>
                    <div className='profile_bio'>
                        <div className='attribute_box'>
                            <label htmlFor="biography" className='etiqueta'>Biography:</label>
                            <textarea type="text" rows={3} id="biography" {...register('biography')} placeholder="Write something about you here" disabled={edit}/><br/>
                            <span className="error">{errors.biography?.message}</span>
                        </div>
                    </div>
                    <div className='buttons_box'>
                        <button type="submit" className="confirm btn btn-success" hidden={edit}>Confirm</button>
                        <button type="button" className="edit btn btn-primary" onClick={() => setEdit(false)}>Edit profile</button>
                        <button type="button" className="cancel btn btn-danger" onClick={() => setEdit(true)} hidden={edit}>Cancel</button>
                    </div>
                </div>
            </form>

            {notifications_html}

            <div className='user_scooter'>
                <div className="title">
                    <h3>Scooter rented</h3>
                </div>
                <div className='scooter_info'>
                    <p className='scooter_void'>{error_scooterMSG}</p>
                    <div className="card" hidden={isScooter}>
                        <div className="card_image">
                            <img src="/assets/scooter.png"/> 
                        </div>
                        <div className="card_title title-black">
                            <p>{userScooter.name}</p>
                        </div>
                        <div className="report">
                            <p className="report_button" onClick={() => report(userScooter.id)}>
                                <FontAwesomeIcon className='icon' icon="fa-solid fa-circle-exclamation" />
                                Report an incidence
                            </p>
                        </div>
                        <IncidenceSlotModal openModal={openModal} setOpenModal={setOpenModal} incidenceType={incidence_type} id={modalScooter} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;