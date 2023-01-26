import React, { useState } from "react";
import './StationsList.scss';
import { useStations } from "../../../hooks/useStations";
import StationsListAdmin from "../../../components/Admin/Station/StationsListAdmin";

const StationsList = () => {

    const {stations, useDeleteStation} = useStations();

    return (
        <StationsListAdmin stations={stations} deleteStation={useDeleteStation}/>
    )
}

export default StationsList;