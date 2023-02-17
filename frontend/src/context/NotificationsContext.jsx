import React, { useState, useEffect, useContext } from 'react'
import NotificationsService from '../services/NotificationsService';
import AuthContext from './AuthContext';
import IncidentsContext from './IncidentsContext';

const Context = React.createContext({})

export function NotificationsContextProvider({ children }) {
    const { isAuth } = useContext(AuthContext);
    const { incidents } = useContext(IncidentsContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(function () {
        if (isAuth) {
            NotificationsService.getAllNotifications()
                .then(({ data }) => {
                    // console.log(data);
                    setNotifications(data);
                })
        }
    }, [setNotifications, isAuth, incidents])

    return <Context.Provider value={{ notifications, setNotifications }}>
        {children}
    </Context.Provider>
}

export default Context