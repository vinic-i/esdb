import axios from 'axios';
import {api} from './axios'

const API_URL = 'http://localhost:8080/api/condominios';

export const getAllCondominios = () => {
    return api.get(API_URL);
};

export const getCondominiosByOwner = (ownerId) => {
    return api.get(`${API_URL}/owner/${ownerId}`);
};

export const getCondominioById = (id) => {
    return api.get(`${API_URL}/${id}`);
};

export const createCondominio = (condominio) => {
    return api.post(API_URL, condominio);
};

export const deleteCondominio = (id) => {
    return api.delete(`${API_URL}/${id}`);
};

export const updateCondominio = (id, condominio, idUser) => {
    return api.put(`${API_URL}/${id}/${idUser}`, condominio);
};

export const getEspacosByCondominioId = (condominioId) => {
    return api.get(`${API_URL}/${condominioId}/espacos`);
};
