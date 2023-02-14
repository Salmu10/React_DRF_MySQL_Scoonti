// import './StationCard.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStations } from "../../hooks/useStations";
import SlotsList from "../../components/Client/Rent/SlotsList";

export default function StationCard ({ station }) {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { oneStation, useOneStation, stationSlots } = useStations();

    useEffect(function () {
        useOneStation(slug);
    }, [])

    return (
        stationSlots.length > 0 ? <SlotsList station={oneStation} slots={stationSlots}/> : <p>No stations available</p>
    )
}