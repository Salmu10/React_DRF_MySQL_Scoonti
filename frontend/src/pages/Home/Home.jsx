import React from 'react';
import './Home.scss';
import { useStations } from "../../hooks/useStations";
import StationsMap from "../../components/Client/StationsMap.jsx";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

export default function Home() {
    const {stations} = useStations();
    return (
        stations.length === 0 ? <SpinnerLoading />
        :<div className="home_container">
            <div className='maps'>
                <StationsMap stations={stations}/>
            </div>
        </div>
    )
}