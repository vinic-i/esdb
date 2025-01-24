import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {listarEspacosDisponiveis} from "../../api/espacoApi";
import {createCondominio} from "../../api/condominioApi";
import {createReserva} from "../../api/reservaApi";
import {useUser} from "../../store/UsuarioContext"; // Corrigir a importação da função
const Agendamentos = () => {
    const {id} = useParams(); // Obtém o ID do condomínio
    const [espacos, setEspacos] = useState([]); // Lista de espaços
    const [dataReserva, setDataReserva] = useState(new Date()); // Data atual para consulta
    const {user} = useUser();

    useEffect(() => {
        const fetchEspacos = async () => {
            try {
                const formattedDate = dataReserva.toISOString().split('T')[0];
                const response = await listarEspacosDisponiveis(id, formattedDate);
                setEspacos(response.data); // Atualiza a lista de espaços com as disponibilidades
            } catch (error) {
                console.error("Erro ao carregar espaços:", error);
            }
        };
        fetchEspacos();
    }, [id, dataReserva]);

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

    const handleReservation = async (e, espacoID) => {
        e.preventDefault();
        try {
            const newReservation = {
                dataReserva: dataReserva,
                usuarioId: user.id,
                espacoId: espacoID,
                status: '',
            };
            await createReserva(newReservation);
            alert('Reserva feita com sucesso!');
            const formattedDate = dataReserva.toISOString().split('T')[0];
            const response = await listarEspacosDisponiveis(id, formattedDate);
            setEspacos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', // Dia com 2 dígitos
        month: 'long',  // Nome completo do mês
        year: 'numeric' // Ano completo
    }).format(dataReserva);

    return (
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <h2 className='text-center  align-content-center'>Agendamentos</h2>

                    <div className="d-flex justify-content-center">
                        <button className="btn btn-dark" onClick={handlePrevDay}> {'<'} </button>
                        <div className="form-group mx-3">
                            <input
                                type="date"
                                className="form-control"
                                value={dataReserva.toLocaleDateString('pt-BR').split('/').reverse().join('-')}
                                onChange={(e) => setDataReserva(new Date(e.target.value))}
                            />
                        </div>
                        <button className="btn btn-dark" onClick={handleNextDay}> {'>'} </button>
                    </div>
                </div>
            </div>
            <div className='card'>
                <div className='card-body'>
                    <h5>Espaços para: <strong>{formattedDate}</strong></h5>

                    {espacos.length > 0 ? (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th className='text-center  align-content-center'>Descrição</th>
                                <th className='text-center  align-content-center'>Capacidade</th>
                                <th className='text-center  align-content-center'>Disponibilidade</th>
                                <th className='text-center  align-content-center'>Morador</th>
                                <th className='text-center  align-content-center'></th>
                            </tr>
                            </thead>
                            <tbody>
                            {espacos.map((espaco) => (
                                <tr key={espaco.id}>
                                    <td className='align-content-center'>{espaco.nome}</td>
                                    <td className='text-center  align-content-center'>{espaco.descricao}</td>
                                    <td className='text-center  align-content-center'>{espaco.capacidade}</td>
                                    <td className='text-center  align-content-center'>
                                       <span
                                           className={`badge ${espaco.disponibilidade ? 'bg-success' : 'bg-danger'} rounded-pill p-2`}>
                                            {espaco.disponibilidade ? 'Disponível' : 'Indisponível'}
                                        </span>

                                    </td>
                                    <td className='text-center  align-content-center'>
                                        {espaco.temReserva && (
                                            <p>{espaco.usuarioReserva}</p>
                                        )}
                                    </td>
                                    <td className='text-center  align-content-center'>
                                        <button onClick={(e) => handleReservation(e, espaco.id)}
                                                className='btn btn-primary m-0'>Reservar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Nenhum espaço disponível para esta data.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Agendamentos;
