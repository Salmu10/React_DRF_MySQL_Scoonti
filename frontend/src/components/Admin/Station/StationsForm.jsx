import './StationsForm.scss';
import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const StationsForm = ({station= {slug: '', name: '', status: '', image: '', latitude: '', longitude: '', slots: ''}, form_type, sendData}) => {
    const navigate = useNavigate();

    const validators = Yup.object().shape({
        name: Yup.string().required('*Name is required').min(3).max(15),
        status: Yup.string().required('*Status is required'),
        image: Yup.string().url().required('*Image is required').min(3).max(100),
        latitude: Yup.number().required('*Latitude is required').min(-180).max(180),
        longitude: Yup.number().required('*Longitude is required').min(-180).max(180),
        slots: Yup.number().required('*Slots number must be between 5 and 20').min(5).max(20),
    });

    const {register, handleSubmit, setValue, formState: {errors} } = useForm({resolver: yupResolver(validators)});
    
    useEffect(() => {
        if (station.slug !== '') {
            setValue('name', station.name);
            setValue('status', station.status);
            setValue('image', station.image);
            setValue('latitude', station.latitude);
            setValue('longitude', station.longitude);
            setValue('slots', station.total_slots);
        }
    }, [station]);

    const send_data = data => {
        sendData(data);
    };

    const redirects = {
        stations: () => navigate('/dashboard/stations')
    };

    const button_type = form_type == 'create' ? 'Create' : 'Update';
    const read_only = form_type == 'update' ? true : false;

    return (
        <form className='add_form' onSubmit={handleSubmit(send_data)}>
            <div className='name_box'>
                <label htmlFor="name" className='etiqueta'>Station Name:</label>
                <input type="text" id="name" {...register('name')}/><br/>
                <span className="error">{errors.name?.message}</span>
            </div>
            <div className='status_box'>
                <label htmlFor='status' className='etiqueta'>Status:</label>
                <select id='status' name="status" {...register('status')} defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                </select><br/>
                <span className="error">{errors.status?.message}</span>
            </div>
            <div className='image_box'>
                <label htmlFor='image' className='etiqueta'>Image:</label>
                <input id='image' name="image" type="text" {...register('image')}/><br/>
                <span className="error">{errors.image?.message}</span>
            </div>
            <div className='latitude_box'>
                <label htmlFor='latitude' className='etiqueta'>Latitude:</label>
                <input id='latitude' name="latitude" type="text" {...register('latitude')}/><br/>
                <span className="error">{errors.latitude?.message}</span>
            </div>
            <div className='longitude_box'>
                <label htmlFor='longitude' className='etiqueta'>Longitude:</label>
                <input id='longitude' name="longitude" type="text" {...register('longitude')}/><br/>
                <span className="error">{errors.longitude?.message}</span>
            </div>
            <div className='slots_box'>
                <label htmlFor='slots' className='etiqueta'>Slots:</label>
                <input id='slots' name="slots" type="text" {...register('slots')} disabled={read_only}/><br/>
                <span className="error">{errors.slots?.message}</span>
            </div>
            <div className='buttons_box'>
                <button type="submit" className="btn btn-primary">{button_type}</button>
                <button type="button" className="btn btn-danger" onClick={() => redirects.stations()}>Cancel</button>
            </div>
        </form>
    )
}

export default StationsForm;