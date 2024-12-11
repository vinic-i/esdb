import React from 'react';

import SideBar from "../components/template/SideBar";
import NavBar from "../components/template/NavBar";
import {Outlet} from "react-router-dom";


const GeneralLayout = () => {
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

export default GeneralLayout;