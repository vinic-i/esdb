import React from 'react';
import PropTypes from 'prop-types';

const CardItem = ({
                      title = 'Default Title',
                      amount = 0,
                      quantidade = 0,
                      icon = 'ni ni-money-coins text-lg opacity-10',
                      iconContainerClass = 'bg-gradient-primary shadow-primary' // Classe padrão do contêiner do ícone

                  }) => {
    return (
        <div className="card">
            <div className="card-body p-3">
                <div className="row">
                    <div className="col-8">
                        <div className="numbers">
                            {title && (
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">{title}</p>
                            )}
                            {amount !== undefined && (
                                <h5 className="font-weight-bolder">{amount ? amount + ' disnponíveis' : ''}</h5>
                            )}
                            {quantidade !== undefined && (
                                <p className="mb-0">
                                    <span className="text-success text-sm font-weight-bolder">
                                        {quantidade ? quantidade + ' ' : ''}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="col-4 text-end">
                        {icon && (
                            <div className={`icon icon-shape ${iconContainerClass} text-center rounded-circle`}>
                                <i className={icon} aria-hidden="true"></i>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

CardItem.propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    quantidade: PropTypes.number,
    icon: PropTypes.string,
};

export default CardItem;
