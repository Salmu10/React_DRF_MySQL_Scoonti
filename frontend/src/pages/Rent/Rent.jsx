import { useState } from 'react';
import { useStations } from "../../hooks/useStations";
import StationsList from "../../components/Rent/StationsList.jsx";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

export default function Rent() {
    const {stations} = useStations();
    // console.log({stations});
    return (
        // <h1>Hola rent</h1>
        stations.length === 0 ? <SpinnerLoading />
        :<div>
            <StationsList stations={stations}/>
        </div>
    )
}