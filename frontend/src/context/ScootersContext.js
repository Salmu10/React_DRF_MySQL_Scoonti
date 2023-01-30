import React, { useState, useEffect } from 'react'
import ScooterService from '../services/ScooterService';

const Context = React.createContext({})

export function ScooterContextProvider({ children }) {
    const [scooters, setScooters] = useState([]);

    useEffect(function () {
        ScooterService.getAllScooters()
            .then(({data}) => {
                setScooters(data);
            })
            .catch(e => console.error(e));
    }, [setScooters]);

    return <Context.Provider value={{ scooters, setScooters }}>
        {children}
    </Context.Provider>
}

export default Context