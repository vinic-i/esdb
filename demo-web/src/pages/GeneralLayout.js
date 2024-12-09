import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../components/template/SideBar";
import NavBar from "../components/template/NavBar";
import {Outlet, Route, Routes} from "react-router-dom";
import RolesPage from "./RolesPage";
import UsuariosPage from "./UsuariosPage";
import CondominioPage from "./CondominioPage";
import CondominioDetailsPage from "./CondominioDetailsPage";

const GeneralLayout = props => {
    return (
        <>
            <div className="min-height-300 bg-primary position-absolute w-100"></div>
            <SideBar/> {/* Sidebar */}
            <main className="main-content position-relative border-radius-lg">
                <NavBar/> {/* Navbar */}
                <div className="container-fluid py-4">
                    {/* Aqui, o Outlet renderiza as rotas internas definidas em App.js */}
                    <Outlet/>
                </div>
            </main>
        </>
    )
        ;
};

GeneralLayout.propTypes = {};

export default GeneralLayout;