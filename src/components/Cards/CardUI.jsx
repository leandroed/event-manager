import React from 'react';
import './card-style.css';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { FiEye } from 'react-icons/fi';
import { getToken } from '../../services/auth';
import api from '../../services/api';

const Card = props => {
    const history = useHistory();

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

    async function handleEdit(props) {
        history.push({
            pathname: 'createEvent',
            state: props,
        })
    }

    return (
        <div className="card text-center shadow">
            <div className="overflow">
                <img src={props.imgsrc} alt="" className="card-img-top"/>
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
                <button type="button" className="card-show card-options" onClick={handleShow}><FiEye size={20} /></button>
                { props.user.id === parseInt(localStorage.getItem('userId')) ?
                    <span>
                        <button type="button" className="card-delete card-options" onClick={() => handleDelete(props.eventId)}>
                            <FiTrash2 size={20} />
                        </button>
                        <button type="button" className="card-edit card-options" onClick={() => handleEdit(props)}>
                            <FiEdit2 size={20} />
                        </button>
                    </span> : <span/>
                }
            </div>
        </div>
    );
}

export default Card;