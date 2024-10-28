import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservas';

export const getAllReservas = () => {
    return axios.get(API_URL);
};

export const getReservaById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createReserva = (reserva) => {
    return axios.post(API_URL, reserva);
};

export const deleteReserva = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const atualizarReserva = (id, reserva) => {
    return axios.put(`${API_URL}/${id}`, reserva);
};
