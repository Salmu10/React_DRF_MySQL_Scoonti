import React, { useState, useEffect, useContext } from 'react'
import NotificationsService from '../services/NotificationsService';
import AuthContext from './AuthContext';
import IncidentsContext from './IncidentsContext';

const Context = React.createContext({})

export function NotificationsContextProvider({ children }) {
    const { isAuth } = useContext(AuthContext);
    const { incidents } = useContext(IncidentsContext);
    const [notifications, setNotifications] = useState([]);
    const [notificationsNumber, setNotificationsNumber] = useState(0);

    useEffect(function () {
        if (isAuth) {
            NotificationsService.getAllNotifications()
                .then(({ data }) => {
                    setNotifications(data);
                    setNotificationsNumber(data.length);
                })
        }
    }, [setNotifications, isAuth, incidents])

    return <Context.Provider value={{ notifications, setNotifications, notificationsNumber, setNotificationsNumber }}>
        {children}
    </Context.Provider>
}

export default Context