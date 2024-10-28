// src/components/template/NavBar.js
import React from 'react';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">Condomínio</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/#">Configurações</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#">Notificações</a>
                        </li>
                        <li className="nav-item">
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Pesquisar..." />
                                <button className="btn btn-primary" type="submit">Buscar</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
