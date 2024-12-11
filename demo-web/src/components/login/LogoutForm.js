import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando hook de navegação

const Logout = () => {
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        // Remove o token do localStorage (ou sessionStorage)
        localStorage.removeItem('authToken');
        
        // Redireciona o usuário para a página de login
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <h2>Saindo...</h2>
        </div>
    );
};

export default Logout;