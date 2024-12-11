import React, {useEffect, useState} from 'react';
import {deleteCondominio, getCondominiosByOwner} from '../../api/condominioApi';
import {Link} from 'react-router-dom';
import {useUser} from "../../store/UsuarioContext";

const CondominioList = ({refreshList}) => {
    const [condominios, setCondominios] = useState([]);
    const {user} = useUser(); // Obtenha o usuário do contexto

    useEffect(() => {
        const fetchCondominios = async () => {
            try {
                const response = await getCondominiosByOwner(user.id);
                setCondominios(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCondominios();
    }, [refreshList, user]);

    const handleDelete = async (id) => {
        try {
            await deleteCondominio(id);
            setCondominios(condominios.filter((condominio) => condominio.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header pb-0">
                <h6>Lista de Condomínios</h6>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
                <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                        <thead>
                        <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Nome
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Endereço
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Proprietário
                            </th>
                            <th className="text-secondary opacity-7"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(condominios) && condominios.length > 0 ? (
                            condominios.map((condominio) => (
                                <tr key={condominio.id}>
                                    <td>{condominio.nome}</td>
                                    <td>{condominio.endereco}</td>
                                    <td>{condominio.owner?.nome || 'Sem proprietário'}</td>
                                    <td className="d-flex justify-content-around">
                                        <button
                                            className="btn btn-danger m-0 "
                                            onClick={() => handleDelete(condominio.id)}
                                            title="Deletar"
                                        >
                                            <i className="fas fa-trash"></i>
                                            Deletar
                                        </button>


                                        <Link
                                            className="btn btn-success m-0"
                                            to={`/condominio/${condominio.id}`}
                                            title="Visualizar"
                                        >
                                            Visualizar
                                            <i className="fas fa-eye"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Nenhum condomínio cadastrado.
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

export default CondominioList;
