import axios from 'axios';

const API_URL = 'http://localhost:8080/api/condominios';

export const getAllCondominios = () => {
    return axios.get(API_URL);
};

export const getCondominioById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createCondominio = (condominio) => {
    return axios.post(API_URL, condominio);
};

export const deleteCondominio = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const atualizarCondominio = (id, condominio) => {
    return axios.put(`${API_URL}/${id}`, condominio);
};

export const getEspacosByCondominioId = (condominioId) => {
    return axios.get(`${API_URL}/${condominioId}/espacos`);
};
