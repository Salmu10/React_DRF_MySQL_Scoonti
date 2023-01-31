import React, { useState, useEffect } from 'react'
// import AuthService from '../services/AuthService';
// import JwtService from '../services/JwtService';

const Context = React.createContext({})

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState();
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            console.log('hola get user');
        } else {
            console.log('No hay user');
        }
    }, [token]);

    return <Context.Provider value={{ token, setToken, user, setUser, isAuth, setIsAuth, isAdmin, setIsAdmin }}>
        {children}
    </Context.Provider>
}

export default Context