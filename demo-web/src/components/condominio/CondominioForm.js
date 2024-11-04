import React, {useEffect, useState} from 'react';
import {createCondominio, getAllCondominios} from '../../api/condominioApi';
import {useUser} from '../../store/UsuarioContext'; // Importe o contexto do usuário

const CondominioForm = ({atualizarCondominios}) => {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bloco, setBloco] = useState('');
    const [apartamento, setApartamento] = useState('');
    const [descricao, setDescricao] = useState('');
    const {user} = useUser(); // Obtenha o usuário do contexto


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCondominio = {
                nome: nome ? nome : '',
                endereco,
                bloco,
                apartamento,
                descricao,
                ownerId: user.id // Defina o ownerId como o id do usuário do contexto
            };
            await createCondominio(newCondominio);
            alert('Condomínio cadastrado com sucesso!');
            atualizarCondominios(); // Atualiza a lista de condomínios
            // Reseta os campos
            setNome('');
            setEndereco('');
            setBloco('');
            setDescricao('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card">
            <div className="card-header pb-0">
                <h6>Cadastrar Condomínio</h6>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Endereço</label>
                        <input
                            type="text"
                            className="form-control"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Bloco</label>
                        <input
                            type="text"
                            className="form-control"
                            value={bloco}
                            onChange={(e) => setBloco(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Apartamento</label>
                        <input
                            type="text"
                            className="form-control"
                            value={apartamento}
                            onChange={(e) => setApartamento(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                            className="form-control"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    <p>Proprietário: {user ? user.nome : 'Sem usuário'}</p> {/* Mostra o nome do proprietário selecionado */}
                    <button type="submit" className="btn btn-primary mt-2">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CondominioForm;
