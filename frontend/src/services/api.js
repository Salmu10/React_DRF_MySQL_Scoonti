import axios from 'axios';
import secrets from '../secrets';

export default function api() {
    const api = axios.create({
        baseURL: secrets.URL_DRF
    })

    return api;
}