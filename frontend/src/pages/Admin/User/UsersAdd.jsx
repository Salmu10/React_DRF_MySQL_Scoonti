import React, { useEffect } from "react";
import ScootersForm from "../../../components/Admin/Scooter/ScootersForm";
import { useScooters } from "../../../hooks/useScooters";
import { useNavigate } from "react-router-dom";

const ScootersAdd = () => {
    const { isCorrect, useAddScooter } = useScooters();
    const form_type = 'create';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/dashboard/scooters');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="scooter_add_container">
            <div className="title">
                <h2>Create Scooter</h2>
            </div>
            <ScootersForm form_type={form_type} sendData={(data) => useAddScooter(data)}/>
        </div>
    )
}

export default ScootersAdd;