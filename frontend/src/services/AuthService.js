import api from './api';

const AuthService = {

    Register(data) {
        return api().post('register', { 'user': data });
    },

    Login(data) {
        return api().post('login', { 'user': data });
    },

    getUser() {
        return api().get('user');
    },

    getProfile(id) {
        return api().get(`profile/${id}`);
    }
}

export default AuthService;