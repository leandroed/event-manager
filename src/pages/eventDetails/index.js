import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { getToken } from '../../services/auth';
import ReactToExcel from 'react-html-table-to-excel';
import './styles.css';
import api from '../../services/api.js';

const NewEvent = props => {
    const [companion, setCompanion] = useState('');
    const [guests, setGuests] = useState([]);
    const data = props.location.state;

    const history = useHistory();

    useEffect(() => {
        api.get(`list/${data.eventId}`, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': getToken() } }).then(response => {
            setGuests(response.data[0].list ? response.data[0].list : []);
            console.log(response.data[0].list)
        })
    }, [data]);

    async function handleConfirm(e) {
        e.preventDefault();

        const data = {
            name: companion,
            user: { id: parseInt(localStorage.getItem('userId')) }
        }

        const dataUser = {
            event: { id: props.location.state.eventId },
            user: { id: parseInt(localStorage.getItem('userId')) }
        }

        try {
            await api.post('list', dataUser, { headers: { 'Content-Type': 'application/json', 'Authorization': getToken() } });
            await api.post('guests', data, { headers: { 'Content-Type': 'application/json', 'Authorization': getToken() } });
            history.push('/app');
        } catch (e) {
            alert('Erro não foi possível confirmar a presença.');
        }
    }

    async function handleRemoveGuest(userId) {
        try {
            await api.delete(`list/${userId}`, { headers: { 'Content-Type': 'application/json', 'Authorization': getToken() }});
            setGuests(guests.filter(guest => guest.user.id !== userId));
        } catch (e) {
            alert('Não foi possível remover a presença no evento.');
        }
    }

    async function handleSelfRemoveGuest(userId) {
        handleRemoveGuest(userId);
        window.location.reload();
    }

    return (
        <div className="event-details-container">
            <div className="content">
                <section>
                    <h1>{data.title}</h1>
                    <p>Local: {data.address}</p>
                    <p>Data: { Intl.DateTimeFormat("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: 'numeric', 
                        minute: 'numeric'
                      }).format(new Date(data.date))}</p>
                    <p>{data.description}</p>

                    <Link className="back-link" to="/app">
                        <FiArrowLeft size={16} />
                    </Link>
                </section>
                
                {data.user.id === parseInt(localStorage.getItem('userId'))?
                        <form>
                            <div className="row list-container list-scroll">
                                <div className="col-md-12" style={{overflow: 'auto'}}> 
                                    <table className="list-group" id="table-to-xls">  
                                        <thead className="list-group-item">
                                            <tr>
                                                <th style={{width: '45px'}}></th>
                                                <th className="tbRow">Convidado</th>
                                                <th>Acompanhante</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {guests.map(guest => (
                                            <tr className="list-group-item" key={guest.id}>
                                                <td>
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => handleRemoveGuest(guest.user.id)} style={{border: 'none', marginRight: '9px'}}>
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                </td>
                                                <td className="tbRow">{guest.user.email}</td>
                                                <td>{guest.user?.guest[0]?.name}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>  
                            </div>

                            <ReactToExcel
                                className="button"
                                table="table-to-xls"
                                filename="guestList"
                                sheet="sheet 1"
                                buttonText="Download"
                            />
                        </form>
                    : (guests.filter(guest => guest.user.id === parseInt(localStorage.getItem('userId')))).length === 0 ?              
                        <form onSubmit={handleConfirm}>
                            <h5>Confirmar presença:</h5>
                            <input
                                type="text"
                                placeholder="Acompanhante"
                                value={companion}
                                onChange={e => setCompanion(e.target.value)}
                            />
                            
                            <button className="btn btn-outline-primary" type="submit" style={{marginTop: '15px'}}>Confirmar</button>
                        </form>
                        :
                        <section>
                            <h5>Presença confirmada!</h5>
                            <button type="button" className="btn btn-outline-danger" onClick={() => handleSelfRemoveGuest(localStorage.getItem('userId'))}>Cancelar</button>
                        </section>
                }
            </div>
        </div>
    );
}

export default NewEvent;