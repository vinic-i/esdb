import React, { useState, useEffect } from 'react';
import CondominioForm from "../components/condominio/CondominioForm";
import { useUser } from "../store/UsuarioContext";
import { useNavigate } from 'react-router-dom';
import { getCondominiosByOwner } from '../api/condominioApi';

const CondominioPage = () => {
    const [refreshList, setRefreshList] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();

    // Verifica se o usuário já tem um condomínio
    useEffect(() => {
        const checkCondominio = async () => {
            try {
                const response = await getCondominiosByOwner(user.id);
                if (response.data.length > 0) {
                    // Se tiver condomínio, redireciona para a página do primeiro condomínio
                    navigate(`/condominio/${response.data[0].id}`);
                }
            } catch (error) {
                console.log('Erro ao buscar condomínios:', error);
            }
        };

        if (user) {
            checkCondominio();
        }
    }, [user, navigate]);

    const handleRefresh = () => {
        setRefreshList(!refreshList);
    };

    return (
        <div>
            {!user ? (
                <p>Carregando...</p> // Ou outro tipo de mensagem até o usuário estar carregado
            ) : (
                <div>
                    <h3 className="text-white">Cadastrar condomínio</h3>
                    <CondominioForm atualizarCondominios={handleRefresh} />
                </div>
            )}
        </div>
    );
};

export default CondominioPage;
