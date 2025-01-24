// src/components/condominios/EspacoList.js
import React, { useEffect, useState } from 'react';
import {getEspacosByCondominioId} from "../../api/condominioApi";
import {deleteEspaco} from "../../api/espacoApi";

const EspacoList = ({ condominioId, refreshList }) => {
    const [espacos, setEspacos] = useState([]);

    useEffect(() => {
        const fetchEspacos = async () => {
            try {
                const response = await getEspacosByCondominioId(condominioId);
                setEspacos(response.data);
            } catch (error) {
                console.error("Erro ao carregar espaços:", error);
            }
        };
        fetchEspacos();
    }, [refreshList, condominioId]);


    const handleDeleteEspaco = async (id) => {
        try {
            await deleteEspaco(id);
            setEspacos(espacos.filter(espaco => espaco.id !== id));
            alert('Espaço excluído com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir o espaço:', error);
            alert('Falha ao excluir o espaço. Tente novamente.');
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h6>Lista de Espaços</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Capacidade</th>
                            <th className="text-center">Disponibilidade</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(espacos) && espacos.length > 0 ? (
                            espacos.map((espaco) => (
                                <tr key={espaco.id}>
                                    <td>{espaco.nome}</td>
                                    <td>{espaco.capacidade}</td>
                                    <td className="text-center">
                                        {espaco.disponibilidade ? 'Disponível' : 'Indisponível'}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteEspaco(espaco.id)}>
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Nenhum espaço cadastrado.
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

export default EspacoList;
