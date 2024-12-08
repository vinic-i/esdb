import React from 'react';

const CondominioDetails = ({condominio}) => {
    return (
        <div>
            <h2>{condominio.nome}</h2>
            <p><strong>Descrição:</strong> {condominio.descricao}</p>
            <p><strong>Endereço:</strong> {condominio.endereco}</p>
            <p><strong>Proprietário:</strong> {condominio.owner.nome}</p>
            {/* Adicione outros detalhes conforme necessário */}
        </div>
    );
};

export default CondominioDetails;
