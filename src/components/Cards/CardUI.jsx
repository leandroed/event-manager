import React, { useState } from 'react';
import './card-style.css';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { getToken } from '../../services/auth';
import api from '../../services/api';

const Card = props => {
    const history = useHistory();
    const eventId = props.eventId;

    function handleShow (e) {
        e.preventDefault();

        history.push({ pathname: 'eventDetail', state: props });
    }

    async function handleDelete(eventId) {
        try {
            await api.delete(`event/${eventId}`, { headers: { 'Authorization': getToken() }});
            window.location.reload();
        } catch (e) {
            console.log('Não foi possível remover o evento.');
        }
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
                { props.user.id === parseInt(localStorage.getItem('userId')) ?
                    <button type="button" className="card-delete" onClick={() => handleDelete(props.eventId)}>
                        <FiTrash2 size={20} />
                    </button> : <span/>
                }
            </div>
        </div>
    );
}

export default Card;