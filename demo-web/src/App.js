// src/App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import RolesPage from './pages/RolesPage';
import UsuariosPage from './pages/UsuariosPage';
import CondominioPage from "./pages/CondominioPage";
import NavBar from "./components/template/NavBar";
import SideBar from "./components/template/SideBar";
import Footer from "./components/template/Footer";
import {UserProvider} from "./store/UsuarioContext";
import CondominioDetailsPage from './pages/CondominioDetailsPage';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    <NavBar/>
                    <div className="d-flex">
                        <SideBar/>
                        <main className="container-fluid py-4 flex-grow-1">
                            <Routes>
                                <Route path="/roles" element={<RolesPage/>}/>
                                <Route path="/usuarios" element={<UsuariosPage/>}/>
                                <Route path="/condominio" element={<CondominioPage/>}/>
                                <Route path="/condominio/:id" element={<CondominioDetailsPage/>} />
                            </Routes>
                        </main>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </UserProvider>
    )
        ;
};

export default App;
