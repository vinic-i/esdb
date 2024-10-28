import React, {useEffect, useState} from 'react';
import {createUsuario} from '../../api/usuarioApi';
import {getAllRoles} from "../../api/rolesApi";

const UsuarioForm = ({atualizarUsuarios}) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [notificacoes, setNotificacoes] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getAllRoles();
                setRoles(response.data);
            } catch (error) {
                console.error("Erro ao carregar roles:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleRoleChange = (roleId) => {
        setSelectedRoles(prevSelectedRoles =>
            prevSelectedRoles.includes(roleId)
                ? prevSelectedRoles.filter(id => id !== roleId)
                : [...prevSelectedRoles, roleId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        try {
            const newUser = {
                nome,
                email,
                senha,
                notificacoes,
                roleIds: selectedRoles
            };
            await createUsuario(newUser);
            alert('Usuário cadastrado com sucesso!');
            atualizarUsuarios();  // Atualiza a lista de usuários
            setNome('');
            setEmail('');
            setSenha('');
            setConfirmarSenha('');
            setNotificacoes(false);
            setSelectedRoles([]);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Cadastrar Usuário</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <label className="form-label">Confirmar Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Notificações</label>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="notificacoes"
                                checked={notificacoes}
                                onChange={(e) => setNotificacoes(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="notificacoes">
                                Receber notificações
                            </label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Papéis</label>
                        {roles.length > 0 ? (
                            roles.map(role => (
                                <div key={role.id} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={role.id}
                                        checked={selectedRoles.includes(role.id)}
                                        onChange={() => handleRoleChange(role.id)}
                                    />
                                    <label className="form-check-label">{role.nome}</label>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum papel encontrado.</p>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UsuarioForm;
