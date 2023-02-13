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

    // let SlotCard = null;
    // if (slotStation.length > 0) {
    //     SlotCard = slotStation.map(item => {
    //         const img = item.status === 'used' ? goodImage : item.status === 'unused' ? usedImage : maintenanceImage;
    //         return (<div className="card" key={item.id} style={{ backgroundImage: `url(${img})` }}>
    //             <div className="content">
    //                 <p className="copy">Slot: {item.status}</p>
    //                 <button className="btn" onClick={() => {
    //                     rentId(item)
    //                 }
    //                 }>{item.status == "unused" ? (<a>Return Bike</a>) : (<a>Rent Bike</a>)}</button>
    //             </div>
    //         </div>)
    //     }
    //     )
    // } else {
    //     SlotCard = <p>No slots available</p>
    // }

    return (
        stationSlots.length > 0 ? <SlotsList slots={stationSlots}/> : <p>No stations available</p>
    )
}