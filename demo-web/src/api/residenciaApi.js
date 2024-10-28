import axios from 'axios';

const API_URL = 'http://localhost:8080/api/residencias';

export const getAllResidencias = () => {
    return axios.get(API_URL);
};

export const getResidenciaById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createResidencia = (residencia) => {
    return axios.post(API_URL, residencia);
};

export const deleteResidencia = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const atualizarResidencia = (id, residencia) => {
    return axios.put(`${API_URL}/${id}`, residencia);
};
