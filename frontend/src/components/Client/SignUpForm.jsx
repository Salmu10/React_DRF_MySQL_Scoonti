import './SignForm.scss';
import React, { useEffect } from "react";

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignUpForm = ({form_type, sendData}) => {
    const navigate = useNavigate();

    const validators = Yup.object().shape({
        reg_username: Yup.string().required('*Username is required').min(3, '*Username must be between 3 and 15 characters').max(15, '*Username must be between 3 and 15 characters'),
        reg_email: Yup.string().email('*Email format invalid').required('*Email is required'),
        reg_password: Yup.string().required('*Password is required').min(5, '*Password must have at least 5 characters'),
        reg_password_2: Yup.string().oneOf([Yup.ref('reg_password'), null], '*Passwords must match'),
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
                        <p className="user_unregistered-text">Register now and you can reserve the desired table.</p>
                        <button className="user_unregistered-signup" id="signup-button" onClick={() => redirects.register()}>Sign up</button>
                    </div>
                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Have an account?</h2>
                        <p className="user_registered-text">Sign in with your account and continue with your reserve.</p>
                        <button className="user_registered-login" id="login-button" onClick={() => redirects.login()}>Sign in</button>
                    </div>
                </div>
                <div id="user_options-forms" className={bounce_type}>
                    <div className="user_forms-signup">
                        <h2 className="forms_title">Sign Up</h2>
                        <form className="forms_form" onSubmit={handleSubmit(send_data)}>
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input type="text" placeholder="Username" className="forms_field-input" {...register('reg_username')}/>
                                    <span className="error">{errors.reg_username?.message}</span>
                                </div>
                                <div className="forms_field">
                                    <input type="email" placeholder="Email" className="forms_field-input" {...register('reg_email')}/>
                                    <span className="error">{errors.reg_email?.message}</span>
                                </div>
                                <div className="forms_field">
                                    <input type="password" placeholder="Password" className="forms_field-input" {...register('reg_password')}/>
                                    <span className="error">{errors.reg_password?.message}</span>
                                </div>
                                <div className="forms_field">
                                    <input type="password" placeholder="Repeat password" className="forms_field-input" {...register('reg_password_2')}/>
                                    <span className="error">{errors.reg_password_2?.message}</span>
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <input type="submit" value="Sign up" className="forms_buttons-action"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default SignUpForm;