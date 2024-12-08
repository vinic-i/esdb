import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {listarEspacosDisponiveis} from "../../api/espacoApi"; // Corrigir a importação da função

const Agendamentos = () => {
    const {id} = useParams(); // Obtém o ID do condomínio
    const [espacos, setEspacos] = useState([]); // Lista de espaços
    const [dataReserva, setDataReserva] = useState(new Date()); // Data atual para consulta

    useEffect(() => {
        const fetchEspacos = async () => {
            try {
                // Converte a data para o formato 'YYYY-MM-DD' para enviar na URL
                const formattedDate = dataReserva.toISOString().split('T')[0];
                const response = await listarEspacosDisponiveis(id, formattedDate);
                setEspacos(response.data); // Atualiza a lista de espaços com as disponibilidades
            } catch (error) {
                console.error("Erro ao carregar espaços:", error);
            }
        };
        fetchEspacos();
    }, [id, dataReserva]); // Recarrega quando o ID ou a data mudar

    const handleNextDay = () => {
        const nextDay = new Date(dataReserva);
        nextDay.setDate(nextDay.getDate() + 1); // Avança um dia
        setDataReserva(nextDay);
    };

    const handlePrevDay = () => {
        const prevDay = new Date(dataReserva);
        prevDay.setDate(prevDay.getDate() - 1); // Retrocede um dia
        setDataReserva(prevDay);
    };

    return (
        <div className="card">
            <div className="card-body">

                <h2>Agendamentos para {dataReserva.toISOString().split('T')[0]}</h2>

                <div>
                    <button onClick={handlePrevDay}>Anterior</button>
                    <button onClick={handleNextDay}>Próximo</button>
                </div>

                <div>
                    <h3>Espaços Disponíveis</h3>
                    <ul>
                        {espacos.length > 0 ? (
                            espacos.map((espaco) => (
                                <li key={espaco.id}>
                                    <h4>{espaco.nome}</h4>
                                    <p>{espaco.descricao}</p>
                                    <p>Capacidade: {espaco.capacidade}</p>
                                    <p>Status de
                                        Disponibilidade: {espaco.disponibilidade ? 'Disponível' : 'Indisponível'}</p>
                                    {espaco.temReserva && (
                                        <p>Reserva feita por: {espaco.usuarioReserva.nome}</p>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>Nenhum espaço disponível para esta data.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Agendamentos;
