import React from "react";
import { useScooters } from "../../../hooks/useScooters";
import ScootersListAdmin from "../../../components/Admin/Scooter/ScootersListAdmin";

const ScootersList = () => {

    const {scooters, useDeleteScooter} = useScooters();

    return (
        <ScootersListAdmin scooters={scooters} deleteScooter={useDeleteScooter}/>
    )
}

export default ScootersList;
