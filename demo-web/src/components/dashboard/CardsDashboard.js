import React from 'react';
import PropTypes from 'prop-types';
import CardItem from "../template/CardItem";
import {Link} from "react-router-dom";

const CardsDashboard = props => {
    return (
        <div className="row">
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <Link to={`/condominio/espacos/${props.id}`}>
                    <CardItem
                        title="Espaços"
                        icon="ni ni-money-coins text-lg opacity-10"
                        iconContainerClass="bg-gradient-success shadow-success"
                    />
                </Link>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <Link to={`/condominio/agendamentos/${props.id}`}>
                    <CardItem
                        title="Agendamentos"
                        icon="ni ni-world text-lg opacity-10"
                        iconContainerClass="bg-gradient-danger shadow-danger"
                    />
                </Link>
            </div>
            {/*<div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">*/}
            {/*    <CardItem*/}
            {/*        title="Cadastrar encomenda"*/}
            {/*        icon="ni ni-paper-diploma text-lg opacity-10"*/}
            {/*        iconContainerClass="bg-gradient-success shadow-success"*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div className="col-xl-3 col-sm-6">*/}
            {/*    <CardItem*/}
            {/*        title="Alugueis de apartamento"*/}
            {/*        icon="ni ni-cart text-lg opacity-10"*/}
            {/*        iconContainerClass="bg-gradient-warning shadow-warning"*/}
            {/*    />*/}
            {/*</div>*/}

        </div>
    );
};

CardsDashboard.propTypes = {
    id: PropTypes.number.isRequired,
};

export default CardsDashboard;