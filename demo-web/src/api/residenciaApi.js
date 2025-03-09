import {api} from './axios'

const API_URL = 'http://localhost:8080/api/residencias';

export const getAllResidencias = () => {
    return api.get(API_URL);
};

export const getMoradorResidencia = (residenciaId) => {
    return api.get(`${API_URL}/${residenciaId}/usuarios`);
};

export const getResidenciaById = (id) => {
    return api.get(`${API_URL}/${id}`);
};

export const createResidencia = (residencia) => {
    return api.post(API_URL, residencia);
};

export const deleteResidencia = (id) => {
    return api.delete(`${API_URL}/${id}`);
};

export const atualizarResidencia = (id, residencia) => {
    return api.put(`${API_URL}/${id}`, residencia);
};
