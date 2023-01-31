import { useCallback, useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext";
import AuthService from "../services/AuthService";
import { toast } from "react-toastify";

export function useAuth() {
    const { user, setUser } = useContext(AuthContext);
    const [isCorrect, setIsCorrect] = useState(false);

    const useRegister = useCallback((data) => {
        AuthService.Register({ 'user': data })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((e) => {
                console.error(e);
                toast.error('Username or email is used');
            });
    }, []);

    const useLogin = useCallback((data) => {
        AuthService.Login({ 'user': data })
            .then(({ data }) => {
                console.log(data);
                setIsCorrect(true);
                setTimeout(() => { setIsCorrect(false); }, 1000);
            })
            .catch((e) => {
                console.error(e);
                toast.error('Username or password incorrect');
            });
    }, []);

    return { isCorrect, user, setUser, useRegister, useLogin }
}