import React, {useState} from 'react';
import {updateCondominio} from "../../api/condominioApi";
import {searchUsuarios} from "../../api/usuarioApi";
import {useUser} from "../../store/UsuarioContext";

const AdicionarAdm = ({condominio}) => {
    const [administradoreIds, setAdministradoreIds] = useState([]);
    const [params, setParams] = useState('');
    const [usuariosEncontrados, setUsuariosEncontrados] = useState([]);
    const {user} = useUser();

    // setAdministradoreIds(condominio.administradores)
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const usuarios = await searchUsuarios(params);
            setUsuariosEncontrados(usuarios.data)
            console.log(usuariosEncontrados)
        } catch (e) {
            console.error("Erro ao buscar usuário", e)
        }
    }

    const handleAddAdmin = (usuarioId) => {
        if (!administradoreIds.includes(usuarioId)) {
            setAdministradoreIds([...administradoreIds, usuarioId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const condominioAtualizado = {
                nome: condominio.nome,
                endereco: condominio.endereco,
                bloco: condominio.bloco,
                apartamento: condominio.apartamento ?? '',
                descricao: condominio.descricao,
                ownerId: condominio.owner.id,
                residenciaIds: condominio.residencias,
                administradoreIds: administradoreIds,
            };
            console.log("Objeto para envio:", condominioAtualizado);
            console.log("Objeto para envio:", administradoreIds);
            await updateCondominio(condominio.id, condominioAtualizado, user.id ?? 402);
            alert('Administradores adicionados com sucesso!');
            setAdministradoreIds([]);
            setUsuariosEncontrados([]);
            setParams('');
        } catch (error) {
            console.error("Erro ao adicionar administradores:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Cadastrar administradores</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="search" className="form-label">Buscar usuário</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                id="search"
                                placeholder="Digite o nome ou email"
                                value={params}
                                onChange={(e) => setParams(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleSearch}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                    {usuariosEncontrados.length > 0 ? (
                        <div className="mb-3">
                            <ul className="list-group">
                                {usuariosEncontrados.map((usuario) => (
                                    <li key={usuario.id}
                                        className="list-group-item d-flex justify-content-between align-items-center">
                                        {usuario.nome} - {usuario.email}
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleAddAdmin(usuario.id)}
                                        >
                                            Adicionar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>Nenhum usuário encontrado</p>
                    )}

                    {administradoreIds.length > 0 && (
                        <div className="mb-3">
                            <h6>Administradores selecionados:</h6>
                            <ul className="list-group">
                                {administradoreIds.map((id) => (
                                    <li key={id} className="list-group-item">
                                        ID do Administrador: {id}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary">
                        Cadastrar administradores
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdicionarAdm;