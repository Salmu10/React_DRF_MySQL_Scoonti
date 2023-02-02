const JwtService = {
    getToken: () => localStorage.getItem('token'),
    saveToken: (token) => localStorage.setItem('token', token),
    destroyToken: () => localStorage.removeItem('token'),
}

export default JwtService;