import React, { useEffect } from "react";
import ScootersForm from "../../../components/Admin/Scooter/ScootersForm";
import { useScooters } from "../../../hooks/useScooters";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ScootersUpdate = () => {
    const { slug } = useParams();
    const { useOneScooter, oneScooter, isCorrect, useUpdateScooter } = useScooters(slug);
    const form_type = 'update';
    const navigate = useNavigate();

    useEffect(() => {
        if (slug !== '') {
            useOneScooter(slug);
        }
        if (isCorrect) {
            navigate('/dashboard/scooters');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="scooter_update_container">
            <div className="title">
                <h1>Update Scooter</h1>
            </div>
            <ScootersForm scooter={oneScooter} form_type={form_type} sendData={(data) => useUpdateScooter(slug, data)}/>
        </div>
    )
}

export default ScootersUpdate;