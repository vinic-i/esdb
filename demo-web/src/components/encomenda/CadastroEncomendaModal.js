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
    const [isOutroMoradorChecked, setIsOutroMoradorChecked] = useState(false); // Para controlar a mudança do campo de usuário

    // Função para buscar os usuários da residência
    const fetchUsuarios = async (residenciaId) => {
        try {
            setLoadingUsuarios(true);
            const response = await getMoradorResidencia(residenciaId); // Chamando o método getMoradorResidencia
            setUsuarios(response.data); // A resposta vem no formato { data: [...] }
            if (response.data.length > 0) setUsuarioId(response.data[0].id); // Definindo o primeiro usuário como o padrão
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

        // Criação do objeto de encomenda
        const encomendaData = {
            outroMorador,
            dataChegada,
            usuario: isOutroMoradorChecked ? null : {id: usuarioId},  // Se outro morador estiver selecionado, o usuário será null
            status: 'A_RETIRAR', // Ou outro valor de status desejado
        };

        try {
            // Salvando a encomenda com a função da API
            await createEncomenda(encomendaData);
            alert('Encomenda cadastrada com sucesso!');
        } catch (error) {
            alert('Erro ao cadastrar encomenda!');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsuarios(apId); // Buscando os usuários quando o componente é montado
    }, [apId]);

    return (
        <>
            <button type="button"
                    onClick={() => fetchUsuarios(apId)}
                    className="btn btn-link text-danger text-gradient px-3 mb-0"
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
                                        <label htmlFor="outroMorador" className="form-label">Outro morador</label>
                                        <input type="text" className="form-control" id="outroMorador"
                                               value={outroMorador}
                                               onChange={(e) => setOutroMorador(e.target.value)}
                                               />
                                    </div>
                                )}


                                {/* Se houver usuários, mostrar o select, caso contrário, mostrar o campo de "Outro Morador" */}
                                {usuarios.length > 0 && !isOutroMoradorChecked && (
                                    <div className="mb-3">
                                        <label htmlFor="usuario" className="form-label">Selecionar Usuário</label>
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

                                {/* Campo Data Chegada */}
                                <div className="mb-3">
                                    <label htmlFor="dataChegada" className="form-label">Data de Chegada</label>
                                    <input type="datetime-local" className="form-control" id="dataChegada"
                                           value={dataChegada}
                                           onChange={(e) => setDataChegada(e.target.value)} required/>
                                </div>

                                {/* Botão para definir "Chegou hoje" */}
                                <button type="button" className="btn btn-link p-0 px-1" onClick={handleHoje}>Chegou
                                    hoje
                                </button>
                                <div className="modal-footer">
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
