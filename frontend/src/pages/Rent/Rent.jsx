import { useState } from 'react';
import './Rent.scss';

import { useStations } from "../../hooks/useStations";
import { useScooters } from "../../hooks/useScooters";

import StationsList from "../../components/Client/Rent/StationsList.jsx";
import ScootersList from "../../components/Client/Rent/ScootersList.jsx";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

export default function Rent() {
    
    const {stations} = useStations();
    const {scooters} = useScooters();

    return (
        stations.length === 0 ? <SpinnerLoading />
        :<div className="rent_container">
            <StationsList stations={stations}/>
            <ScootersList scooters={scooters}/>
        </div>
    )
}