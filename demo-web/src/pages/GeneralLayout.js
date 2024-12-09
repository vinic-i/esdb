import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../components/template/SideBar";
import NavBar from "../components/template/NavBar";
import {Route, Routes} from "react-router-dom";
import RolesPage from "./RolesPage";
import UsuariosPage from "./UsuariosPage";
import CondominioPage from "./CondominioPage";
import CondominioDetailsPage from "./CondominioDetailsPage";

const GeneralLayout = props => {
    return (
        <>
            <div className="min-height-300 bg-primary position-absolute w-100"></div>
            <SideBar/>
            <main className="main-content position-relative border-radius-lg ">
                {/*<NavBar/>*/}
                <div className="container-fluid py-4">

                    <Routes>
                        <Route path="/" element={<CondominioPage/>}/>
                        <Route path="/roles" element={<RolesPage/>}/>
                        <Route path="/usuarios" element={<UsuariosPage/>}/>
                        <Route path="/condominio/:id" element={<CondominioDetailsPage/>}/>
                    </Routes>
                </div>
            </main>
        </>
    )
        ;
};

GeneralLayout.propTypes = {};

export default GeneralLayout;