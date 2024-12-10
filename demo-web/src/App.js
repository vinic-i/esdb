// src/App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {UserProvider} from "./store/UsuarioContext";
import Login from "./components/login/LoginForm";
import GeneralLayout from "./pages/GeneralLayout";
import UsuariosPage from "./pages/UsuariosPage";
import RolesPage from "./pages/LoginPage";
import CondominioDetailsPage from "./pages/CondominioDetailsPage";
import CondominioPage from "./pages/CondominioPage";
import RegisterForm from "./components/login/RegisterForm";
import LogoutForm from "./components/login/LogoutForm"

const App = () => {
    return (
        <UserProvider>
            <Router>

                <Routes>
                    {/* Rota de login, sem layout completo */}
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/logout" element={<LogoutForm/>}/>

                    {/* Rota para conteúdo interno, com layout completo */}
                    <Route path="/" element={<GeneralLayout/>}>
                        <Route path="/" element={<CondominioPage/>}/>
                        {/*<Route path="/roles" element={<RolesPage/>}/>*/}
                        <Route path="/usuarios" element={<UsuariosPage/>}/>
                        <Route path="/condominio/:id" element={<CondominioDetailsPage/>}/>
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    )
        ;
};

export default App;
