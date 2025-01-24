import React, {useEffect} from 'react';
import {getAllUsuarios, deleteUsuario} from '../../api/usuarioApi';

const UsuarioList = ({refreshList}) => {
    const [users, setUsers] = React.useState([]);

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
            <div className="card-header pb-0">
                <h6 className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Lista de
                    Usuários</h6>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                        <thead>
                        <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Role</th>
                            <th className="text-secondary opacity-7"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="d-flex px-2 py-1">
                                            <div className="d-flex flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm">{user.nome}</h6>
                                                <p className="text-xs text-secondary mb-0">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span>{user.role}</span>
                                    </td>
                                    <td className="align-middle text-center">
                                        {/*<button className="btn btn-link text-secondary" onClick={() => login(user)}*/}
                                        {/*        title="Visualizar">*/}
                                        {/*    <i className="fas fa-eye"></i>*/}
                                        {/*</button>*/}

                                        <button className="btn btn-link text-danger"
                                                onClick={() => handleDelete(user.id)} title="Deletar">
                                            <i className="fas fa-trash"></i>
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
