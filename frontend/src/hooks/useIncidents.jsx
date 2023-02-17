import React, { useEffect, useCallback, useState, useContext } from "react";
import IncidentsContext from '../context/IncidentsContext';
import IncidentsService from '../services/IncidentsService';
import { toast } from 'react-toastify'
import AuthContext from "../context/AuthContext";


export function useIncidents() {
    const { isAuth } = useContext(AuthContext);
    const { incidentsSlots, setIncidentsSlots, incidentsScooters, setIncidentsScooters } = useContext(IncidentsContext);
    const [userIncidents, setUserIncidents] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    const useAddSlotIncidence = useCallback((data) => {
        if (isAuth) {
            IncidentsService.createSlotIncidence(data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents([...userIncidents, data]);
                        setIncidentsSlots([...incidentsSlots, data]);
                        toast.success('Incidence sended, we will try to fix it. Thanks you!');
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useAddScooterIncidence = useCallback((data) => {
        if (isAuth) {
            IncidentsService.createScooterIncidence(data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents([...userIncidents, data]);
                        setIncidentsScooters([...incidentsScooters, data]);
                        toast.success('Incidence sended, we will try to fix it. Thanks you!');
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useDeleteIncidence = (type, id) => {
        if (isAuth) {
            if (type == 'slot') {
                IncidentsService.deleteSlotIncidence(id)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            toast.success(data.data);
                            setIncidentsSlots(incidentsSlots.filter(incidence => incidence.id !== id));
                        }
                    })
                    .catch(e => console.error(e));
            } else if (type == 'scooter') {
                IncidentsService.deleteScooterIncidence(id)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            toast.success(data.data);
                            setIncidentsScooters(incidentsScooters.filter(incidence => incidence.id !== id));
                        }
                    })
                    .catch(e => console.error(e));
            }
        }
    }

    return { isCorrect, incidentsSlots, setIncidentsSlots, incidentsScooters, setIncidentsScooters, userIncidents, setUserIncidents, useAddSlotIncidence, useAddScooterIncidence, useDeleteIncidence };  
}