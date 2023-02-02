import { useCallback, useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext";
import AuthService from "../services/AuthService";
import JwtService from "../services/JwtService";
import { toast } from "react-toastify";

export function useAuth() {
    const { user, setUser, token, setToken, isAuth, setIsAuth, isAdmin, setIsAdmin } = useContext(AuthContext);
    const [isCorrect, setIsCorrect] = useState(false);
    const [ errorMSG, setErrorMSG ] = useState("");

    const useRegister = useCallback((data) => {
        AuthService.Register({ 'user': data })
            .then(({ data, status }) => {
                if (status == 200) {
                    JwtService.saveToken(data.token);
                    setToken(data.token);
                    setUser(data.user);
                    setIsAuth(true);
                    setIsAdmin(data.user.type === 'admin');
                    setIsCorrect(true);
                    setErrorMSG('');
                    toast.success('Singed up successfully');
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch((e) => {
                console.error(e);
                setErrorMSG(e.response.data[0]);
                toast.error(e.response.data[0]);
            });
    }, []);

    const useLogin = useCallback((data) => {
        AuthService.Login({ 'user': data })
            .then(({ data, status }) => {
                if (status === 200) {
                    JwtService.saveToken(data.token);
                    setToken(data.token);
                    setUser(data.user);
                    setIsAuth(true);
                    setIsAdmin(data.user.type === 'admin');
                    setIsCorrect(true);
                    setErrorMSG('');
                    toast.success('Login successfully');
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch((e) => {
                console.error(e);
                setErrorMSG(e.response.data[0]);
                toast.error(e.response.data[0]);
            });
    }, [setUser]);

    const useLogout = useCallback(() => {
        JwtService.destroyToken();
        setToken(false);
        setIsAuth(false);
        setIsAdmin(false);
        setUser({});
        toast.success('Loged out successfully');
    }, []);

    return { isCorrect, user, setUser, useRegister, useLogin, useLogout, errorMSG, setErrorMSG }
}