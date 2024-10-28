import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notificacoes';

export const getAllNotificacoes = () => {
    return axios.get(API_URL);
};

export const getNotificacaoById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createNotificacao = (notificacao) => {
    return axios.post(API_URL, notificacao);
};

export const deleteNotificacao = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const atualizarNotificacao = (id, notificacao) => {
    return axios.put(`${API_URL}/${id}`, notificacao);
};
