// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import {useUser} from "../../store/UsuarioContext";

const PrivateRoute = ({ element }) => {
    const { user } = useUser();

    // Verifica se o usuário está logado (considerando o contexto e o localStorage)
    if (!user && !localStorage.getItem('authToken')) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default PrivateRoute;
