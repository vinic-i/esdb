import React, {useState, useEffect} from 'react';
import {createEncomenda} from "../../api/encomendaApi";
import {getMoradorResidencia} from "../../api/residenciaApi";

const CadastroEncomendaModal = ({apId}) => {
    const [outroMorador, setOutroMorador] = useState('');
    const [dataChegada, setDataChegada] = useState('');
    const [usuarioId, setUsuarioId] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);
    const [error, setError] = useState(null);
    const [isOutroMoradorChecked, setIsOutroMoradorChecked] = useState(false);
    const [status, setStatus] = useState('A_RETIRAR');
    const [nomeRetirado, setNomeRetirado] = useState('');
    const [documentoRetirado, setDocumentoRetirado] = useState('');


    const fetchUsuarios = async (residenciaId) => {
        try {
            setLoadingUsuarios(true);
            const response = await getMoradorResidencia(residenciaId);
            setUsuarios(response.data);
            if (response.data.length > 0) setUsuarioId(response.data[0].id);
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
            setError("Erro ao carregar os usuários.");
        } finally {
            setLoadingUsuarios(false);
        }
    };

    const handleHoje = () => {
        const hoje = new Date().toISOString().slice(0, 16);
        setDataChegada(hoje);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const encomendaData = {
            outroMorador,
            dataChegada,
            usuario: isOutroMoradorChecked ? null : {id: usuarioId},
            status: status,
            nomeRetirado: status === 'RETIRADO' ? nomeRetirado : null,
            documentoRetirado: status === 'RETIRADO' ? documentoRetirado : null,
            residencia: {id: apId}
        };

        try {

            await createEncomenda(encomendaData);
            alert('Encomenda cadastrada com sucesso!');
        } catch (error) {
            alert('Erro ao cadastrar encomenda!');
            console.error(error);
        }
    };

    return (
        <>
            <button type="button"
                    onClick={() => fetchUsuarios(apId)}
                    className="btn btn-link text-danger text-gradient p-0 px-3 mb-0"
                    data-bs-toggle="modal" data-bs-target={`#exampleModal-${apId}`}>
                <i className="far fa-trash-alt me-2"></i>Encomenda
            </button>

            {/* Modal Encomenda */}
            <div className="modal fade" id={`exampleModal-${apId}`} tabIndex="-1" role="dialog"
                 aria-labelledby="cadastrarEncomendnaModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cadastrarEncomendnaModal">Cadastrar Encomenda</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='text-start' onSubmit={handleSubmit}>
                                {/* Campo Outro morador */}
                                {(usuarios.length === 0 || isOutroMoradorChecked) && (
                                    <div className="mb-3">
                                        <label htmlFor="outroMorador" className="form-label">Destinatário</label>
                                        <input type="text" className="form-control" id="outroMorador"
                                               value={outroMorador}
                                               onChange={(e) => setOutroMorador(e.target.value)}
                                        />
                                    </div>
                                )}


                                {/* Se houver usuários, mostrar o select, caso contrário, mostrar o campo de "Outro Morador" */}
                                {usuarios.length > 0 && !isOutroMoradorChecked && (
                                    <div className="mb-3">
                                        <label htmlFor="usuario" className="form-label">Selecionar morador</label>
                                        {loadingUsuarios ? (
                                            <p>Carregando usuários...</p>
                                        ) : (
                                            <select className="form-select" id="usuario" value={usuarioId}
                                                    onChange={(e) => setUsuarioId(e.target.value)} required>
                                                {usuarios.map((usuario) => (
                                                    <option key={usuario.id} value={usuario.id}>
                                                        {usuario.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                )}

                                {/* Checkbox para "Outro morador" */}
                                {usuarios.length > 0 && (
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="outroMoradorCheck"
                                               checked={isOutroMoradorChecked}
                                               onChange={() => setIsOutroMoradorChecked(!isOutroMoradorChecked)}/>
                                        <label className="form-check-label" htmlFor="outroMoradorCheck">
                                            Encomenda não será no nome de nenhum morador
                                        </label>
                                    </div>
                                )}

                                {/* Campo Data Chegada*/}
                                <div className="mb-3">
                                    <label htmlFor="dataChegada" className="form-label">Data de Chegada</label>
                                    <input type="date" className="form-control" id="dataChegada"
                                           value={dataChegada}
                                           onChange={(e) => setDataChegada(e.target.value)} required/>
                                </div>

                                {/* Botão para definir "Chegou hoje" */}
                                <button type="button" className="btn btn-link p-0 px-1" onClick={handleHoje}>Chegou
                                    hoje
                                </button>

                                {/* Campo para selecionar o status */}
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status da Encomenda</label>
                                    <select className="form-select" id="status" value={status}
                                            onChange={(e) => setStatus(e.target.value)} required>
                                        <option value="A_RETIRAR">A Retirar</option>
                                        <option value="RETIRADO">Retirado</option>
                                    </select>
                                </div>

                                {/* Campos de nome e documento de retirada, apenas se o status for "RETIRADO" */}
                                {status === 'RETIRADO' && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="nomeRetirado" className="form-label">Nome de quem
                                                retirou</label>
                                            <input type="text" className="form-control" id="nomeRetirado"
                                                   value={nomeRetirado}
                                                   onChange={(e) => setNomeRetirado(e.target.value)} required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="documentoRetirado" className="form-label">Documento de quem
                                                retirou</label>
                                            <input type="text" className="form-control" id="documentoRetirado"
                                                   value={documentoRetirado}
                                                   onChange={(e) => setDocumentoRetirado(e.target.value)} required/>
                                        </div>
                                    </>
                                )}
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn bg-gradient-secondary"
                                            data-bs-dismiss="modal">Fechar
                                    </button>
                                    <button type="submit" className="btn bg-gradient-primary">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CadastroEncomendaModal;
