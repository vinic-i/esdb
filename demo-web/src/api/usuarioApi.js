import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios'; // Ajuste a URL conforme necessário
const API_URL_CADASTRO = 'http://localhost:8080/auth'; // Ajuste a URL conforme necessário


export const getAllUsuarios = () => {
    return axios.get(API_URL);
};

export const getUsuarioById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createUsuario = (usuario) => {
    return axios.post(`${API_URL}`, usuario);
};

export const createUsuario2 = (usuario) => {
    return axios.post(`${API_URL_CADASTRO}/register`, usuario, {
        headers: {
            'Content-Type': 'application/json',
        },
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