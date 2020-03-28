import React, { useState } from 'react';
import './card-style.css';
import { useHistory } from 'react-router-dom';

const Card = props => {
    const history = useHistory();
    const eventId = props.eventId;

    function handleShow (e) {
        e.preventDefault();

        history.push({ pathname: 'eventDetail', state: props });
    }

    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt="Image 1" className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">{
                    Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: 'numeric', 
                        minute: 'numeric'
                      }).format(new Date(props.date))}
                </p>
                <p className="card-text text-secondary">{props.address}</p>
                <p className="card-text text-secondary">{props.description}</p>
                <button type="button" className="btn btn-outline-success" onClick={handleShow}>Visualizar</button>
            </div>
        </div>
    );
}

export default Card;