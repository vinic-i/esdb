import React, {useState} from 'react';
import {updateCondominio} from "../../api/condominioApi";
import {searchUsuarios} from "../../api/usuarioApi";
import {useUser} from "../../store/UsuarioContext";
import CardItem from "../template/CardItem";


const CardsDashboard = () => {
   

    return (
       <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <CardItem
                title="Reservar um espaço"
                icon="ni ni-money-coins text-lg opacity-10"
                iconContainerClass="bg-gradient-success shadow-success"
            />
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <CardItem
                title="Cadastrar morador"
                icon="ni ni-world text-lg opacity-10"
                iconContainerClass="bg-gradient-danger shadow-danger"
            />
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <CardItem
                title="Cadastrar encomenda"
                icon="ni ni-paper-diploma text-lg opacity-10"
                iconContainerClass="bg-gradient-success shadow-success"
            />
        </div>
        <div className="col-xl-3 col-sm-6">
            <CardItem
                title="Alugueis de apartamento"
                icon="ni ni-cart text-lg opacity-10"
                iconContainerClass="bg-gradient-warning shadow-warning"
            />
        </div>

    </div>  
    );
};

export default CardsDashboard;