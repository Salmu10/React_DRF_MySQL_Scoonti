import React, { useEffect } from "react";
import SignInForm from "../../components/Client/Login/SignInForm";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { isCorrect, useLogin, errorMSG } = useAuth();
    const form_type = 'login';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/home');
        }
    }, [isCorrect, navigate]);

    return (
        <SignInForm form_type={form_type} sendData={(data) => useLogin(data)} errorMSG={errorMSG}/>
    )
}

export default Login;