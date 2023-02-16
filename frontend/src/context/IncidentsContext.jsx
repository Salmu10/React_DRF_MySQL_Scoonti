import React, { useState, useEffect, useContext } from 'react'
import IncidentsService from '../services/IncidentsService'
import AuthContext from './AuthContext';

const Context = React.createContext({})

export function IncidentsContextProvider({ children }) {
    const { isAdmin } = useContext(AuthContext);
    const [incidents, setIncidents] = useState([]);

    useEffect(function () {
        if (isAdmin) {
            IncidentsService.getAllIncidents()
                .then(({ data }) => {
                    setIncidents(data)
                })
        }
    }, [setIncidents, isAdmin])

    return <Context.Provider value={{ incidents, setIncidents }}>
        {children}
    </Context.Provider>
}

export default Context