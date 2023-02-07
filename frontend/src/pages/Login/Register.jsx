import React, { useEffect } from "react";
import SignUpForm from "../../components/Client/Login/SignUpForm";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { isCorrect, useRegister, errorMSG } = useAuth();
    const form_type = 'register';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/home');
        }
    }, [isCorrect, navigate]);

    return (
        <SignUpForm form_type={form_type} sendData={(data) => useRegister(data)} errorMSG={errorMSG}/>
    )
}

export default Register;