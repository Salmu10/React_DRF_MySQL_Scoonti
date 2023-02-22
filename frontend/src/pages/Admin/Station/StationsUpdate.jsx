import React, { useEffect } from "react";
import StationsForm from "../../../components/Admin/Station/StationsForm";
import { useStations } from "../../../hooks/useStations";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StationsUpdate = () => {
    const { slug } = useParams();
    const { useOneStation, oneStation, isCorrect, useUpdateStation } = useStations(slug);
    const form_type = 'update';
    const navigate = useNavigate();

    useEffect(() => {
        if (slug !== '') {
            useOneStation(slug);
        }
        if (isCorrect) {
            navigate('/dashboard/stations');
        }
    }, [isCorrect, navigate]);

    return (
        <div className="station_update_container">
            <div className="title">
                <h1>Update Station</h1>
            </div>
            <StationsForm station={oneStation} form_type={form_type} sendData={(data) => useUpdateStation(slug, data)}/>
        </div>
    )
}

export default StationsUpdate;