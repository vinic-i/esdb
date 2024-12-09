// src/App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {UserProvider} from "./store/UsuarioContext";
import Login from "./components/login/LoginForm";
import GeneralLayout from "./pages/GeneralLayout";

const App = () => {
    let login = false
    return (
        <UserProvider>
            <Router>

                {login ? ( // Corrige a estrutura condicional
                    <GeneralLayout/>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                )}
            </Router>
        </UserProvider>
    )
        ;
};

export default App;
