import React, { useEffect } from "react";
import StationsForm from "../../../components/Admin/Station/StationsForm";
import { useStations } from "../../../hooks/useStations";
import { useNavigate } from "react-router-dom";

const StationsAdd = () => {
    const { isCorrect, useAddStation } = useStations();
    const form_type = 'create';
    const navigate = useNavigate();

    useEffect(() => {
        if (isCorrect) {
            navigate('/dashboard/stations');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="station_add_container">
            <div className="title">
                <h1>Create Station</h1>
            </div>
            <StationsForm form_type={form_type} sendData={(data) => useAddStation(data)}/>
        </div>
    )
}

export default StationsAdd;