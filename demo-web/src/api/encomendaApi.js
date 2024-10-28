import axios from 'axios';

const API_URL = 'http://localhost:8080/api/encomendas';

export const getAllEncomendas = () => {
    return axios.get(API_URL);
};

export const getEncomendaById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createEncomenda = (encomenda) => {
    return axios.post(API_URL, encomenda);
};

export const deleteEncomenda = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const atualizarEncomenda = (id, encomenda) => {
    return axios.put(`${API_URL}/${id}`, encomenda);
};
