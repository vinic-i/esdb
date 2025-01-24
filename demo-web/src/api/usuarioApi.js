import axios from 'axios';
import {api} from './axios'

const API_URL = 'http://localhost:8080/api/usuarios';
const API_URL_CADASTRO = 'http://localhost:8080/auth';


export const getAllUsuarios = () => {
    return api.get(API_URL);
};

export const getUsuarioById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createUsuario3 = (usuario) => {
    return axios.post(`${API_URL}`, usuario);
};

export const createUsuario = (usuario) => {
    return api.post(`${API_URL_CADASTRO}/register`, usuario, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
};

export const deleteUsuario = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};

export const atualizarUsuario = (id, usuario) => {
    return axios.put(`${API_URL}/update/${id}`, usuario);
}

export const searchUsuarios = (nome, email) => {
    const params = {};
    if (nome) params.nome = nome;
    if (email) params.email = email;

    return axios.get(`${API_URL}/search`, { params });
};