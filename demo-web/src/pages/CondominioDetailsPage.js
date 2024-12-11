import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CondominioDetails from '../components/condominio/CondominioDetails';
import CardsDashboard from "../components/dashboard/CardsDashboard";
import {getCondominioById} from "../api/condominioApi";

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


    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='row'>
            <h3 className='text-white'>Detalhes do Condomínio:</h3>
            <div className="col-lg-12">
                <div className="card mb-3">
                    <div className="card-body">

                        {condominio ? <CondominioDetails condominio={condominio}/> : <p>Condomínio não encontrado.</p>}
                    </div>
                </div>
            </div>
            <CardsDashboard id={id}/>
        </div>
    );
};

export default CondominioDetailsPage;
