// src/App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {UserProvider} from "./store/UsuarioContext";
import Login from "./components/login/LoginForm";
import GeneralLayout from "./pages/GeneralLayout";

const App = () => {
    let login = true
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<GeneralLayout/>}/>
                </Routes>
            </Router>
        </UserProvider>
    )
        ;
};

export default App;
