import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios'; // Ajuste a URL conforme necessário

export const getAllUsuarios = () => {
    return axios.get(API_URL);
};

export const getUsuarioById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createUsuario = (usuario) => {
    return axios.post(API_URL, usuario);
};

export const deleteUsuario = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};

export const atualizarUsuario = (id, usuario) => {
    return axios.put(`${API_URL}/update/${id}`, usuario);
}