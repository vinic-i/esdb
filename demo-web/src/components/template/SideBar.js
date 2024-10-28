import React from 'react';
import { Link } from "react-router-dom";
import logo from "../../static/logo.svg"

const SideBar = () => {
    return (
        <div className="bg-light border-rounded vh-100 my-3 rounded" style={{ width: '250px' }}>
            <div className="sidebar-heading text-center py-4">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="logo" className="img-fluid" style={{ height: '40px' }} />
                    <span className="ms-2 font-weight-bold">Dashboard</span>
                </Link>
            </div>
            <div className="list-group list-group-flush">
                <Link to="/agendamentos" className="list-group-item list-group-item-action">
                    <i className="bi bi-calendar-check-fill me-2"></i> Agendamentos
                </Link>
                <Link to="/espacos" className="list-group-item list-group-item-action">
                    <i className="bi bi-grid-fill me-2"></i> Espaços
                </Link>
                <Link to="/usuarios" className="list-group-item list-group-item-action">
                    <i className="bi bi-person-fill me-2"></i> Cadastros de Usuários
                </Link>
                <Link to="/condominio" className="list-group-item list-group-item-action">
                    <i className="bi bi-house-fill me-2"></i> Condomínio
                </Link>
                <Link to="/roles" className="list-group-item list-group-item-action">
                    <i className="bi bi-shield-fill me-2"></i> Papéis
                </Link>
                <div className="sidebar-heading mt-3 px-3 text-uppercase text-muted small">
                    Account Pages
                </div>
                <Link to="/perfil" className="list-group-item list-group-item-action">
                    <i className="bi bi-person-circle me-2"></i> Perfil
                </Link>
                <Link to="/sign-in" className="list-group-item list-group-item-action">
                    <i className="bi bi-box-arrow-in-right me-2"></i> Sign In
                </Link>
                <Link to="/sign-up" className="list-group-item list-group-item-action">
                    <i className="bi bi-person-plus-fill me-2"></i> Sign Up
                </Link>
            </div>
        </div>
    );
};

export default SideBar;
