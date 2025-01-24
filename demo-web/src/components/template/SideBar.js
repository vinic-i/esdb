import React from 'react';
import {Link} from "react-router-dom";
import logo from "../../static/logo.svg";

const SideBar = () => {
    return (
        <aside
            className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
            id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                   aria-hidden="true" id="iconSidenav"></i>
                <Link to="/" className="navbar-brand m-0 text-center">
                    {/*<img src={logo} className="navbar-brand-img h-100" alt="main_logo"/>*/}
                    <span className="ms-1 text-center font-weight-bold">Home</span>
                </Link>
            </div>
            <hr className="horizontal dark mt-0"/>
            <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/agendamentos" className="nav-link">*/}
                    {/*        <div*/}
                    {/*            className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">*/}
                    {/*            <i className="ni ni-single-02 text-success text-sm opacity-10"></i>*/}
                    {/*        </div>*/}
                    {/*        <span className="nav-link-text ms-1">Agendamentos</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/espacos" className="nav-link">*/}
                    {/*        <div*/}
                    {/*            className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">*/}
                    {/*            <i className="ni ni-collection text-warning text-sm opacity-10"></i>*/}
                    {/*        </div>*/}
                    {/*        <span className="nav-link-text ms-1">Espaços</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <div
                                className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="ni ni-app text-info text-sm opacity-10"></i></div>
                            <span className="nav-link-text ms-1">Condomínio</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/usuarios" className="nav-link">
                            <div
                                className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="ni ni-single-02 text-success text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text ms-1">Cadastros de Usuários</span>
                        </Link>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/login" className="nav-link">*/}
                    {/*        <div*/}
                    {/*            className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">*/}
                    {/*            <i className="ni ni-key-25 text-warning text-sm opacity-10"></i>*/}
                    {/*        </div>*/}
                    {/*        <span className="nav-link-text ms-1">Sign In</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/roles" className="nav-link">*/}
                    {/*        <div*/}
                    {/*            className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">*/}
                    {/*            <i className="ni ni-single-02 text-success text-sm opacity-10"></i>*/}
                    {/*        </div>*/}
                    {/*        <span className="nav-link-text ms-1">Papéis</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item mt-3">*/}
                    {/*    <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/perfil" className="nav-link">*/}
                    {/*        <div*/}
                    {/*            className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">*/}
                    {/*            <i className="ni ni-single-02 text-dark text-sm opacity-10"></i>*/}
                    {/*        </div>*/}
                    {/*        <span className="nav-link-text ms-1">Perfil</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/sign-in" className="nav-link">*/}
                    {/*        <div*/}
                    {/*            className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">*/}
                    {/*            <i className="ni ni-key-25 text-warning text-sm opacity-10"></i>*/}
                    {/*        </div>*/}
                    {/*        <span className="nav-link-text ms-1">Sign In</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/sign-up" className="nav-link">*/}
                    {/*        <div*/}
                    {/*            className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">*/}
                    {/*            <i className="ni ni-single-02 text-success text-sm opacity-10"></i>*/}
                    {/*        </div>*/}
                    {/*        <span className="nav-link-text ms-1">Sign Up</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </aside>
    );
};

export default SideBar;
