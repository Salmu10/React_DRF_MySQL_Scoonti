import api from './api';

const AuthService = {

    Register(data) {
        return api().post('register', data);
    },

    Login(data) {
        return api().post('login', data);
    },

    GetUser() {
        return api().get('user');
    }
}

export default AuthService;