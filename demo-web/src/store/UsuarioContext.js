// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Cria o contexto do usuário
const UserContext = createContext();

// Provider que será usado no App para compartilhar o estado do usuário
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Função para recuperar os dados do usuário no localStorage ao carregar a página
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Tenta recuperar os dados salvos
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Função de login
    const userLogin = (userData) => {
        setUser(userData);
        // Salva os dados do usuário e o token no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', userData.token);
    };

    // Função de logout
    const logout = () => {
        setUser(null);
        // Remove os dados do localStorage ao deslogar
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    return (
        <UserContext.Provider value={{ user, userLogin, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar o contexto do usuário
export const useUser = () => useContext(UserContext);
