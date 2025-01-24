import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);


    const userLogin = (userData) => {
        setUser(userData);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', userData.token);
    };


    const logout = () => {
        setUser(null);

        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    return (
        <UserContext.Provider value={{ user, userLogin, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
