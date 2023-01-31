import React, { useEffect } from "react";
import SignUpForm from "../../components/Client/SignUpForm";
import { useScooters } from "../../hooks/useScooters";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { isCorrect } = useScooters();
    const form_type = 'register';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/home');
        }
    }, [isCorrect, navigate]);

    const useRegister = (data) => {
        console.log(data);
    }

    return (
        <SignUpForm form_type={form_type} sendData={(data) => useRegister(data)}/>
    )
}

export default Register;