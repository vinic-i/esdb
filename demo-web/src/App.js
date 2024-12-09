// src/App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import CardsDashboard from './components/dashboard/CardsDashboard';
import RolesPage from './pages/RolesPage';
import UsuariosPage from './pages/UsuariosPage';
import CondominioPage from "./pages/CondominioPage";
import NavBar from "./components/template/NavBar";
import SideBar from "./components/template/SideBar";
import {UserProvider} from "./store/UsuarioContext";
import CondominioDetailsPage from './pages/CondominioDetailsPage';
import Login from "./components/login/LoginForm";

const App = () => {

    let login = false
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
                <div className="min-height-300 bg-primary position-absolute w-100"></div>
                <SideBar/>
                <main className="main-content position-relative border-radius-lg ">
                    <NavBar/>
                    <div className="container-fluid py-4">

                        <Routes>
                            <Route path="/" element={<CardsDashboard/>}/>
                            <Route path="/roles" element={<RolesPage/>}/>
                            <Route path="/usuarios" element={<UsuariosPage/>}/>
                            <Route path="/condominio" element={<CondominioPage/>}/>
                            <Route path="/condominio/:id" element={<CondominioDetailsPage/>}/>
                        </Routes>
                    </div>
                </main>
            </Router>
        </UserProvider>
    )
        ;
};

export default App;
