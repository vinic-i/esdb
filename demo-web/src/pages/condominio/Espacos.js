import React, {useState} from 'react';
import EspacoForm from "../../components/espacos/EspacoForm";
import EspacoList from "../../components/espacos/EspacoList";
import {useParams} from "react-router-dom";

const Espacos = () => {
    const {id} = useParams(); // Obtém o ID da URL
    const [refreshEspacos, setRefreshEspacos] = useState(false);

    const atualizarEspacos = () => {
        setRefreshEspacos((prev) => !prev);
    };
    return (
        <div className='row'>
            <div className="col-lg-4">
                <EspacoForm condominioId={id} atualizarEspacos={atualizarEspacos}/>
            </div>
            <div className="col-lg-8">
                <EspacoList condominioId={id} refreshList={refreshEspacos}/>
            </div>
        </div>
    );
};



export default Espacos;