import './ScootersForm.scss';
import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ScootersForm = ({scooter= {slug: '', name: '', status: ''}, form_type, sendData}) => {
    const navigate = useNavigate();

    const validators = Yup.object().shape({
        name: Yup.string().required('*Name is required').min(3).max(15),
        status: Yup.string().required('*Status is required'),
    });

    const {register, handleSubmit, setValue, formState: {errors} } = useForm({resolver: yupResolver(validators)});
    
    useEffect(() => {
        if (scooter.slug !== '') {
            setValue('name', scooter.name);
            setValue('status', scooter.status);
        }
    }, [scooter]);

    const send_data = data => {
        sendData(data);
    };

    const redirects = {
        scooters: () => navigate('/dashboard/scooters')
    };

    const button_type = form_type == 'create' ? 'Create' : 'Update';

    return (
        <form className='add_form' onSubmit={handleSubmit(send_data)}>
            <div className='name_box'>
                <label htmlFor="name" className='etiqueta'>Scooter Name:</label>
                <input type="text" id="name" {...register('name')}/><br/>
                <span className="error">{errors.name?.message}</span>
            </div>
            <div className='status_box'>
                <label htmlFor='status' className='etiqueta'>Status:</label>
                <select id='status' name="status" {...register('status')} defaultValue="">
                    <option value="" disabled>Select</option>
                    <option value="in_use">In use</option>
                    <option value="unused">Unused</option>
                    <option value="maintenance">Maintenance</option>
                </select><br/>
                <span className="error">{errors.status?.message}</span>
            </div>
            <div className='buttons_box'>
                <button type="submit" className="btn btn-primary">{button_type}</button>
                <button type="button" className="btn btn-danger" onClick={() => redirects.scooters()}>Cancel</button>
            </div>
        </form>
    )
}

export default ScootersForm;