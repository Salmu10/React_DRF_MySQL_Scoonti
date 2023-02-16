import React, { useState, useEffect } from 'react'
import SlotService from '../services/SlotService'

const Context = React.createContext({})

export function SlotContextProvider({ children }) {
    const [slots, setSlots] = useState([]);

    useEffect(function () {
        SlotService.getAllSlots()
            .then(({ data }) => {
                setSlots(data);
            })
    }, [setSlots])

    return <Context.Provider value={{ slots, setSlots }}>
        {children}
    </Context.Provider>
}

export default Context