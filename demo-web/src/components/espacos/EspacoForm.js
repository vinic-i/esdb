import React, { useState } from 'react';
import { createEspaco } from '../../api/espacoApi';

const EspacoForm = ({ condominioId, atualizarEspacos }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [capacidade, setCapacidade] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEspaco = { nome, descricao, capacidade, condominioId };
            await createEspaco(newEspaco);
            alert('Espaço cadastrado com sucesso!');
            atualizarEspacos(); // Atualiza a lista de espaços
            setNome('');
            setDescricao('');
            setCapacidade(0);
        } catch (error) {
            console.error("Erro ao criar espaço:", error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Cadastrar Espaço</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Capacidade</label>
                        <input
                            type="number"
                            className="form-control"
                            value={capacidade}
                            onChange={(e) => setCapacidade(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Cadastrar Espaço
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EspacoForm;
