import React, { useEffect } from "react";
import SignInForm from "../../components/Client/SignInForm";
import { useScooters } from "../../hooks/useScooters";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { isCorrect } = useScooters();
    const form_type = 'login';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/home');
        }
    }, [isCorrect, navigate]);

    const useLogin = (data) => {
        console.log(data);
    }

    return (
        <SignInForm form_type={form_type} sendData={(data) => useLogin(data)}/>
    )
}

export default Login;