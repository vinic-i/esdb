import React from 'react';
import PropTypes from 'prop-types';
import CardItem from "../template/CardItem";
import {Link} from "react-router-dom";

const CardsDashboard = props => {
    return (
        <div className="row">
            <div className="col-md-3 mb-3">
                <Link to={`/condominio/espacos/${props.id}`}>
                    <CardItem
                        title="Espaços"
                        icon="ni ni-money-coins text-lg opacity-10"
                        iconContainerClass="bg-gradient-success shadow-success"
                    />
                </Link>
            </div>
            <div className="col-md-3 mb-3">
                <Link to={`/condominio/agendamentos/${props.id}`}>
                    <CardItem
                        title="Agendamentos"
                        icon="ni ni-world text-lg opacity-10"
                        iconContainerClass="bg-gradient-danger shadow-danger"
                    />
                </Link>
            </div>

            <div className="col-md-3 mb-3">
                <Link to={`/condominio/agendamentos/${props.id}`}>
                    <CardItem
                        title="Registrar encomenda"
                        icon="ni ni-world text-lg opacity-10"
                        iconContainerClass="bg-gradient-danger shadow-danger"
                    />
                </Link>
            </div>
            <div className="col-md-3 mb-3">
                <Link to={`/condominio/agendamentos/${props.id}`}>
                    <CardItem
                        title="Agendamentos"
                        icon="ni ni-world text-lg opacity-10"
                        iconContainerClass="bg-gradient-danger shadow-danger"
                    />
                </Link>
            </div>
        </div>
    );
};

CardsDashboard.propTypes = {
    id: PropTypes.number.isRequired,
};

export default CardsDashboard;