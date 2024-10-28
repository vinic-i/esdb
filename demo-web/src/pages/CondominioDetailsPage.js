import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getCondominioById} from '../api/condominioApi';
import CondominioDetails from '../components/condominio/CondominioDetails';
import EspacoForm from '../components/espacos/EspacoForm';
import EspacoList from '../components/espacos/EspacoList';
import AdicionarAdm from "../components/espacos/AdicionarAdm";

const CondominioDetailsPage = () => {
    const {id} = useParams(); // Obtém o ID da URL
    const [condominio, setCondominio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCondominio = async () => {
            try {
                const response = await getCondominioById(id);
                setCondominio(response.data);
            } catch (err) {
                setError("Erro ao carregar os dados do condomínio.");
            } finally {
                setLoading(false);
            }
        };
        fetchCondominio();
    }, [id]);

    const [refreshEspacos, setRefreshEspacos] = useState(false);

    const atualizarEspacos = () => {
        setRefreshEspacos((prev) => !prev);
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='row'>
            <div className="col-lg-12">
                <h1>Detalhes do Condomínio:</h1>
                {condominio ? <CondominioDetails condominio={condominio}/> : <p>Condomínio não encontrado.</p>}
            </div>
            <div className="col-lg-12">
                <AdicionarAdm/>
            </div>
            <div className="col-lg-4">
                <EspacoForm condominioId={id} atualizarEspacos={atualizarEspacos}/>
            </div>
            <div className="col-lg-8">
                <EspacoList condominioId={id} refreshList={refreshEspacos}/>
            </div>
        </div>
    );
};

export default CondominioDetailsPage;
