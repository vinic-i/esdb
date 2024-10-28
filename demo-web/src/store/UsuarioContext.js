// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Cria o contexto do usuário
const UserContext = createContext();

// Provider que será usado no App para compartilhar o estado do usuário
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Funções para login e logout, por exemplo
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personalizado para usar o contexto do usuário
export const useUser = () => useContext(UserContext);
