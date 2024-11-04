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
import CardItem from "./components/template/CardItem";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="min-height-300 bg-primary position-absolute w-100"></div>
                <SideBar/>
                <main className="main-content position-relative border-radius-lg ">
                    <NavBar/>
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <CardItem
                                    title="Reservar um espaço"
                                    icon="ni ni-money-coins text-lg opacity-10"
                                    iconContainerClass="bg-gradient-success shadow-success" // Exemplo de classe personalizada
                                />
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <CardItem
                                    title="Cadastrar morador"
                                    icon="ni ni-world text-lg opacity-10"
                                    iconContainerClass="bg-gradient-danger shadow-danger" // Exemplo de classe personalizada
                                />
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <CardItem
                                    title="Cadastrar encomenda"
                                    icon="ni ni-paper-diploma text-lg opacity-10"
                                    iconContainerClass="bg-gradient-success shadow-success" // Exemplo de classe personalizada
                                />
                            </div>
                            <div className="col-xl-3 col-sm-6">
                                <CardItem
                                    title="Alugueis de apartamento"
                                    icon="ni ni-cart text-lg opacity-10"
                                    iconContainerClass="bg-gradient-warning shadow-warning" // Exemplo de classe personalizada
                                />
                            </div>

                        </div>
                        <Routes>
                            <Route path="/roles" element={<RolesPage/>}/>
                            <Route path="/usuarios" element={<UsuariosPage/>}/>
                            <Route path="/condominio" element={<CondominioPage/>}/>
                            <Route path="/condominio/:id" element={<CondominioDetailsPage/>}/>
                        </Routes>
                    </div>
                </main>
                <Footer/>
            </Router>
        </UserProvider>
    )
        ;
};

export default App;
