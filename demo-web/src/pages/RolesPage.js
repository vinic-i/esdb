// src/pages/RolesPage.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RoleList from '../components/roles/RolesList';
import RoleForm from '../components/roles/RoleForm';

const RolesPage = () => {
    return (
        <div>
            <h2>Gerenciamento de Roles</h2>
            <nav>
                <ul>
                    <li><Link to="list">Listar Roles</Link></li>
                    <li><Link to="create">Criar Role</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="list" element={<RoleList />} />
                <Route path="create" element={<RoleForm />} />
                <Route path="edit/:id" element={<RoleForm />} /> {/* Para editar uma role */}
            </Routes>
        </div>
    );
};

export default RolesPage;
