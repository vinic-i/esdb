import axios from 'axios';

const API_URL = 'http://localhost:8080/api/roles'; // Ajuste a URL conforme necessário

export const getAllRoles = () => {
    return axios.get(API_URL);
};

export const getRoleById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createRole = (role) => {
    return axios.post(API_URL, role);
};

export const deleteRole = (id) => {
    return axios.delete(`${API_URL}/delete/${id}`);
};