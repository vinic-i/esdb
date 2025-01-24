// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import {useUser} from "../../store/UsuarioContext";

const PrivateRoute = ({ element }) => {
    const { user } = useUser();

    if (!user && !localStorage.getItem('authToken')) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default PrivateRoute;
