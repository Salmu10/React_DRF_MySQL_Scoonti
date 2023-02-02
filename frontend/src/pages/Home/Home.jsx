import React, { useState } from 'react';
import './Home.scss';
import { useStations } from "../../hooks/useStations";
import StationsMap from "../../components/Client/StationsMap.jsx";
import SpinnerLoading from "../../components/SpinnerLoading/SpinnerLoading";

export default function Home() {
    const {stations} = useStations();
    const [show, setShow] = useState(null);
    
    return (
        stations.length === 0 ? <SpinnerLoading />
        :<div className="home_container">
            <div className='maps'>
                <StationsMap stations={stations} setShow={setShow}/>
            </div>
        </div>
    )
}