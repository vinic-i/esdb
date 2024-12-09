import axios from 'axios';

const API_URL = 'http://localhost:8080/api/espacos';

export const getAllEspacos = () => {
    return axios.get(API_URL);
};

export const listarEspacosDisponiveis = (idCondominio, dateRequest) => {
    return axios.get(`${API_URL}/disponibilidade/${idCondominio}`, {
        params: { dataReserva: dateRequest } // Passando a data como parâmetro na URL
    });
};

export const getEspacoById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createEspaco = (espaco) => {
    return axios.post(API_URL, espaco);
};

export const deleteEspaco = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const atualizarEspaco = (id, espaco) => {
    return axios.put(`${API_URL}/${id}`, espaco);
};

