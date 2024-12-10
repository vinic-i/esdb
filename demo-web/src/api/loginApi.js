import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/login'; // Ajuste a URL conforme necessário

export const login = (email, senha) => {

    const params = {};
    if (email) params.email = email;
    if (senha) params.senha = senha;

    return axios.post(API_URL, {params});
};
