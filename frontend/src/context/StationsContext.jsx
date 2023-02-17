import React, { useState, useEffect } from 'react'
import StationService from '../services/StationService';

const Context = React.createContext({})

export function StationContextProvider({ children }) {
    const [stations, setStations] = useState([]);

    useEffect(function () {
        StationService.getAllStations()
            .then(({data}) => {
                setStations(data);
                // console.log(data);
            })
            .catch(e => console.error(e));
    }, [setStations]);

    return <Context.Provider value={{ stations, setStations }}>
        {children}
    </Context.Provider>
}

export default Context