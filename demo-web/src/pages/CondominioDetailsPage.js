import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CondominioDetails from '../components/condominio/CondominioDetails';
import CardsDashboard from "../components/dashboard/CardsDashboard";
import { getCondominioById } from "../api/condominioApi";

const CondominioDetailsPage = () => {
    const { id } = useParams();
    const [condominio, setCondominio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blocoSelecionado, setBlocoSelecionado] = useState(null);

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

    useEffect(() => {
        if (condominio && condominio.bloco.length > 0) {
            setBlocoSelecionado(condominio.bloco[0].id.toString());
        }
    }, [condominio]);

    const handleBlocoChange = (event) => {
        setBlocoSelecionado(event.target.value);
    };

    const orderById = (value) => {
        return value.sort((a, b) => a.id - b.id); // Ordenando pelo id do bloco
    };

    const apartamentosFiltrados = condominio && condominio.bloco
        ? orderById(
            condominio.bloco
                .find(bloco => bloco.id.toString() === blocoSelecionado)?.residencias || []
        )
        : [];

    // Blocos ordenados
    const blocosOrdenados = condominio && condominio.bloco ? orderById(condominio.bloco) : [];

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
            <CardsDashboard id={id} />
            <div className="col-lg-12">
                <div className="card mt-3">
                    <div className="card-header">
                        <div className="form-group">
                            {/* Select para escolher o bloco */}
                            <select name="select" onChange={handleBlocoChange} value={blocoSelecionado}>
                                {blocosOrdenados.map((bloco) => (
                                    <option key={bloco.id} value={bloco.id}>
                                        Bloco {bloco.id}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="card-body">
                        {apartamentosFiltrados.length > 0 ? (
                            <div className="row">
                                {apartamentosFiltrados.map((ap) => (
                                    <div key={ap.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                        <div className="card bg-gray-400">
                                            <div className="card-body text-center">
                                                <h5 className="card-title">Bloco - {blocoSelecionado}<br/>Apartamento {ap.numero}</h5>
                                                {/* Você pode adicionar mais detalhes do apartamento aqui */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum apartamento encontrado para o bloco selecionado.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CondominioDetailsPage;
