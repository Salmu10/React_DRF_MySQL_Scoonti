// import './StationsForm.scss';
import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useStations } from "../../../hooks/useStations";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const StationsForm = (station  = { slug: '', name: '', status: '', image: '', latitude: 0, longitude: 0 }) => {

    const validators = Yup.object().shape({
        name: Yup.string().required('*Name is required').min(3).max(15),
        status: Yup.string().required('*Status is required'),
        image: Yup.string().url().required('*Image is required').min(3).max(100),
        latitude: Yup.number().required('*Latitude is required').min(-180).max(180),
        longitude: Yup.number().required('*Longitude is required').min(-180).max(180),
    });

    const {register, handleSubmit, setValue, formState: {errors} } = useForm({resolver: yupResolver(validators)});
    const { useAddStation } = useStations();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (isCorrect) {
    //         navigate('/dashboard/stations');
    //     }
    // }, [isCorrect, navigate]);

    
    useEffect(() => {
        console.log(station);
        if (station.slug !== '') {
            setValue('name', station.name);
            setValue('status', station.status);
            setValue('image', station.image);
            setValue('address', station.address);
        }
    }, [station]);

    const redirects = {
        stations: () => navigate('/dashboard/stations')
    }

    return (
        <div className="station_add_container">
            <div className="title">
                <h2>Create Station</h2>
            </div>
            <form className='add_form' onSubmit={handleSubmit(useAddStation)}>
                <div className='name_box'>
                    <label htmlFor="name" className='etiqueta'>Station Name:</label>
                    <input type="text" id="name" {...register('name')}/><br/>
                    <span className="error">{errors.name?.message}</span>
                </div>
                <div className='status_box'>
                    <label htmlFor='status' className='etiqueta'>Status:</label>
                    <select id='status' name="status" {...register('status')} defaultValue="Active">
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
                <div className='buttons_box'>
                    <button type="submit" className="btn btn-primary">Create</button>
                    <button type="button" className="btn btn-danger" onClick={() => redirects.stations()}>Cancel</button>
                </div>
            </form>
        </div> 
    )
}

export default StationsForm;