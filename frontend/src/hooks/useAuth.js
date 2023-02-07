import { useCallback, useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthContext";
import AuthService from "../services/AuthService";
import JwtService from "../services/JwtService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const { user, setUser, token, setToken, isAuth, setIsAuth, isAdmin, setIsAdmin } = useContext(AuthContext);
    const [isCorrect, setIsCorrect] = useState(false);
    const [profile, setProfile] = useState({});
    const [errorMSG, setErrorMSG] = useState("");
    const navigate = useNavigate();

    const useRegister = useCallback((data) => {
        AuthService.Register(data)
            .then(({ data, status }) => {
                if (status == 200) {
                    JwtService.saveToken(data.token);
                    JwtService.saveRefreshToken(data.ref_token);
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
        AuthService.Login(data)
            .then(({ data, status }) => {
                if (status === 200) {
                    JwtService.saveToken(data.token);
                    JwtService.saveRefreshToken(data.ref_token);
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

    const useProfile = useCallback((id) => {
        AuthService.getProfile(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    setProfile(data);
                }
            })
            .catch(e => console.error(e));
    }, [profile]);

    const useUpdateProfile = useCallback((id, data) => {
        let user_data = {
            username: data.username,
            email: data.email
        }

        let profile_data = {
            id: id,
            name: data.name,
            surnames: data.surnames,
            image: data.image,
            biography: data.biography,
        }

        AuthService.updateProfile(id, user_data, profile_data)
            .then(({ data, status }) => {
                if (status === 200) {
                    JwtService.saveToken(data.token);
                    JwtService.saveRefreshToken(data.ref_token);
                    setToken(data.token);
                    setUser(data.user);
                    setProfile(data.profile);
                    setIsAuth(true);
                    setIsAdmin(data.user.type === 'admin');
                    setIsCorrect(true);
                    setErrorMSG('');
                    toast.success('Profile updated successfully');
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch((e) => {
                console.error(e);
                setErrorMSG(e.response.data[0]);
                toast.error(e.response.data[0]);
            });
    }, []);


    return { isCorrect, user, setUser, useRegister, useLogin, profile, setProfile, useProfile, useUpdateProfile, errorMSG, setErrorMSG }
}