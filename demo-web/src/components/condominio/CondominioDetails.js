import React from 'react';

const CondominioDetails = ({condominio}) => {
    return (
        <>
            <strong>{condominio.nome}</strong>
            <p className='m-0'>{condominio.descricao}</p>
            <p className='m-0'>{condominio.endereco}</p>
            <p className='m-0'>Administrador: {condominio.owner.nome}</p>
        </>
    );
};

export default CondominioDetails;
