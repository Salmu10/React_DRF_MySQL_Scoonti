import api from './api';

const AuthService = {

    Register(data) {
        return api().post('register', { 'user': data });
    },

    Login(data) {
        return api().post('login', { 'user': data });
    },

    GetUser() {
        return api().get('user');
    }
}

export default AuthService;