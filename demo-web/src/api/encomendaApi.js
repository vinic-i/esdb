
import {api} from './axios'

const API_URL = 'http://localhost:8080/api/encomendas';

export const getAllEncomendas = () => {
    return api.get(API_URL);
};

export const getEncomendaById = (id) => {
    return api.get(`${API_URL}/${id}`);
};

export const createEncomenda = (encomenda) => {
    return api.post(API_URL, encomenda);
};

export const deleteEncomenda = (id) => {
    return api.delete(`${API_URL}/${id}`);
};

export const atualizarEncomenda = (id, encomenda) => {
    return api.put(`${API_URL}/${id}`, encomenda);
};
