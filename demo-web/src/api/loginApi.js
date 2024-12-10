import {api} from './axios'

const API_URL = '/auth/login'; // Ajuste a URL conforme necessário

export const login = (email, password) => {

    const params = {};
    if (email) params.email = email;
    if (password) params.password = password;

    return api.post(API_URL, params);
};
 