import React, { useEffect, useCallback, useState, useContext } from "react";
import IncidentsContext from '../context/IncidentsContext';
import IncidentsService from '../services/IncidentsService';
import { toast } from 'react-toastify'
import AuthContext from "../context/AuthContext";


export function useIncidents() {
    const { isAuth } = useContext(AuthContext);
    const { incidents, setIncidents } = useContext(IncidentsContext);
    const [userIncidents, setUserIncidents] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    
    useEffect(() => {
        if (isAuth) {
            // IncidentsService.getIncidentsUser()
            //     .then(({ data, status }) => {
            //         if (status === 200) {
            //             console.log(data);
            //             setUserIncidents(data);
            //         }
            //     })
            //     .catch(e => console.error(e));
        }
    }, []);

    const useAddSlotIncidence = useCallback((data) => {
        if (isAuth) {
            IncidentsService.createSlotIncidence(data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents([...userIncidents, data]);
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
                        console.log(data);
                        // setUserIncidents([...userIncidents, data]);
                        toast.success('Incidence sended, we will try to fix it. Thanks you!');
                        // setIsCorrect(true);
                        // setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    return { isCorrect, incidents, setIncidents, userIncidents, setUserIncidents, useAddSlotIncidence, useAddScooterIncidence };  
}