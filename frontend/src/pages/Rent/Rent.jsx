import { useState } from 'react';
import './Rent.scss';
import { useStations } from "../../hooks/useStations";
import StationsList from "../../components/Client/Rent/StationsList.jsx";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

export default function Rent() {
    
    const {stations} = useStations();

    return (
        stations.length === 0 ? <SpinnerLoading />
        :<div className="rent_container">
            <StationsList stations={stations}/>
        </div>
    )
}