import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getToken } from '../../services/auth';
import api from '../../services/api.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

export default function NewEvent() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            address,
            description,
            date,
        };

        try {
            const response = await api.post('event', data, { headers: { 'Content-Type': 'application/json', 'Authorization': getToken() }});
            console.log(`Id retornado: ${response.data}`);
            history.push('/app')
        } catch (ex) {
            alert('Não foi possível realizar o cadastro do evento.');
        }
    }

    return (
        <div className="new-event-container">
            <div className="content">
                <section>
                    <h1>Cadastrar novo evento</h1>
                    <p>Faça o cadastro de seu evento.</p>

                    <Link className="back-link" to="/app">
                        <FiArrowLeft size={16} />
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome do evento"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        placeholder="Local"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />

                    <DatePicker
                        selected={date}
                        onChange={date => setDate(date)}
                        locale="pt-BR"
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={15}
                        dateFormat="dd/MM/yyyy h:mm"
                    />
                    <input
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    
                    <button className="btn btn-outline-primary" style={{marginTop:'15px'}} type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}