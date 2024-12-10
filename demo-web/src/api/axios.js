import axios from "axios"

export const api = axios.create({
    headers: {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Accept-Language": 'application/json'
    },
    baseURL: "http://localhost:8080/"
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Adiciona o token JWT ao cabeçalho Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);