import React, { useState, useEffect } from 'react'
import JwtService from '../services/JwtService';
import AuthService from '../services/AuthService';

const Context = React.createContext({})

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(JwtService.getToken ? JwtService.getToken : flase);
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            // JwtService.destroyToken();
            AuthService.getUser()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUser(data.user);
                        setIsAuth(true);
                        setIsAdmin(data.user.type === 'admin');
                    }
                })
                .catch(e => console.error(e));
        } else {
            JwtService.destroyToken();
            setToken(false);
            setUser({});
            setIsAuth(false);
            setIsAdmin(false);
        }
    }, [token]);

    return <Context.Provider value={{ user, setUser, token, setToken, isAuth, setIsAuth, isAdmin, setIsAdmin }}>
        {children}
    </Context.Provider>
}

export default Context