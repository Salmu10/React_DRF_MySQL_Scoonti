import React from "react";
import { useIncidents } from "../../../hooks/useIncidents";
import IncidentsListAdmin from "../../../components/Admin/Incidence/IncidentsListAdmin";

const IncidentsList = () => {
    
    const {incidentsSlots, incidentsScooters, useDeleteIncidence} = useIncidents();

    return (
        <IncidentsListAdmin incidents_slots={incidentsSlots} incidents_scooters={incidentsScooters} deleteIncidence={useDeleteIncidence}/>
    )
}

export default IncidentsList;
