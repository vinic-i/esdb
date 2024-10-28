import React, { useEffect } from 'react';
import { getAllUsuarios, deleteUsuario } from '../../api/usuarioApi';
import { useUser } from "../../store/UsuarioContext";

const UsuarioList = ({ refreshList }) => {
    const [users, setUsers] = React.useState([]);
    const { login } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getAllUsuarios();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [refreshList]);

    const handleDelete = async (id) => {
        try {
            await deleteUsuario(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h6>Lista de Usuários</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th className="text-center">Role</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} onClick={() => login(user)}>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td className="text-center">
                                        {user.roles && user.roles.length > 0 ? user.roles[0].nome : 'Sem papel'}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Nenhum usuário cadastrado.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsuarioList;
