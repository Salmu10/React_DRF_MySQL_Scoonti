import './SignForm.scss';
import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignInForm = ({form_type, sendData, errorMSG}) => {
    const navigate = useNavigate();

    const validators = Yup.object().shape({
        username: Yup.string().required('*Username is required').min(3, '*Username must be between 3 and 15 characters').max(15, '*Username must be between 3 and 15 characters'),
        password: Yup.string().required('*Password is required').min(5, '*Password must have at least 5 characters'),
    });

    const {register, handleSubmit, formState: {errors} } = useForm({resolver: yupResolver(validators)});

    const send_data = data => {
        sendData(data);
    };

    const redirects = {
        login: () => navigate('/login'),
        register: () => navigate('/register')
    };

    const bounce_type = form_type == 'login' ? 'user_options-forms SignIn' : 'user_options-forms SignUp';

    return (
        <div className="user">
            <div className="user_options-container">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title">Don't have an account?</h2>
                        <p className="user_unregistered-text">Register now and you can rent a scooter near you.</p>
                        <button className="user_unregistered-signup" id="signup-button" onClick={() => redirects.register()}>Sign up</button>
                    </div>
                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Have an account?</h2>
                        <p className="user_registered-text">Sign in with your account and continue with your scooter renting.</p>
                        <button className="user_registered-login" id="login-button" onClick={() => redirects.login()}>Sign in</button>
                    </div>
                </div>
                
                <div id="user_options-forms" className={bounce_type}>
                    <div className="user_forms-login">
                        <h2 className="forms_title">Sign in</h2>
                        <form className="forms_form" id="login_form" onSubmit={handleSubmit(send_data)}>
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input type="name" placeholder="Username" className="forms_field-input" {...register('username')} autoFocus/>
                                    <span className="error">{errors.username?.message}</span>
                                </div>
                                <div className="forms_field">
                                    <input type="password" placeholder="Password" className="forms_field-input" {...register('password')}/>
                                    <span className="error">{errors.password?.message}</span>
                                </div>
                                <br/>
                                <div className="error">{errorMSG}</div>
                            </fieldset>
                            <div className="forms_buttons">
                                <input type="submit" value="Sign In" className="forms_buttons-action"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInForm;