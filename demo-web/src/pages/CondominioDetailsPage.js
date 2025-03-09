import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import CondominioDetails from '../components/condominio/CondominioDetails';
import CardsDashboard from "../components/dashboard/CardsDashboard";
import {getCondominioById} from "../api/condominioApi";
import CardItem from "../components/template/CardItem";
import CadastroEncomendaModal from "../components/encomenda/CadastroEncomendaModal";

const CondominioDetailsPage = () => {
    const {id} = useParams();
    const [condominio, setCondominio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [blocoSelecionado, setBlocoSelecionado] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

            <div className="col-lg-12">
                <CardsDashboard id={id}/>
            </div>
            <div className="col-lg-8">
                <div className="card mb-3">
                    <div className="card-body">
                        {condominio ? <CondominioDetails condominio={condominio}/> : <p>Condomínio não encontrado.</p>}
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="card mt-3">
                    <div className="card-header">
                        <div className="col-sm-4 col-6">
                            <label className="form-label mt-4">I'm</label>
                            <div className="choices is-open" data-type="select-one" tabIndex="0" role="combobox"
                                 aria-autocomplete="list" aria-haspopup="true" aria-expanded="true"
                                 aria-activedescendant="choices--choices-gender-item-choice-1">
                                <select onChange={handleBlocoChange} value={blocoSelecionado}
                                        className="form-control choices__input" name="choices-gender"
                                        id="choices-gender"
                                        hidden="" tabIndex="-1" data-choice="active">
                                    {blocosOrdenados.map((bloco) => (
                                        <option key={bloco.id} value={bloco.id}>
                                            Bloco {bloco.id}
                                        </option>
                                    ))}
                                </select>


                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        {apartamentosFiltrados.length > 0 ? (
                            <div className="row">
                                {apartamentosFiltrados.map((ap) => (
                                    <div key={ap.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                        <div className="d-flex bg-gray-200">
                                            <div className="d-flex flex-column p-3">
                                                <h6 className="mb-3 text-sm">Bloco - {blocoSelecionado}</h6>
                                                <h6 className="mb-3 text-sm">Apartamento {ap.numero}</h6>
                                            </div>
                                            <div className="ms-auto text-end">

                                                {/* Modal de Cadastro de Encomenda */}
                                                    <CadastroEncomendaModal
                                                        apId={ap.id} // Passe o id da residência aqui
                                                    />

                                                <a className="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                                                    <i className="fas fa-pencil-alt text-dark me-2"
                                                       aria-hidden="true"></i>Mensagem
                                                </a>
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
