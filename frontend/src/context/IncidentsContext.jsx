import React, { useState, useEffect, useContext } from 'react'
import IncidentsService from '../services/IncidentsService'
import AuthContext from './AuthContext';

const Context = React.createContext({})

export function IncidentsContextProvider({ children }) {
    const { isAdmin } = useContext(AuthContext);
    const [incidentsSlots, setIncidentsSlots] = useState([]);
    const [incidentsScooters, setIncidentsScooters] = useState([]);

    useEffect(function () {
        if (isAdmin) {
            IncidentsService.getAllIncidentsSlots()
                .then(({ data }) => {
                    setIncidentsSlots(data);
                })
        }
    }, [setIncidentsSlots, isAdmin])

    useEffect(function () {
        if (isAdmin) {
            IncidentsService.getAllIncidentsScooters()
                .then(({ data }) => {
                    setIncidentsScooters(data);
                })
        }
    }, [setIncidentsScooters, isAdmin])

    return <Context.Provider value={{ incidentsSlots, setIncidentsSlots, incidentsScooters, setIncidentsScooters }}>
        {children}
    </Context.Provider>
}

export default Context