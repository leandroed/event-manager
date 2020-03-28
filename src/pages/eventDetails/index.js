import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api.js';

const NewEvent = props => {
    const [companion, setCompanion] = useState('');

    const history = useHistory();
    const data = props.location.state;

    function handleConfirm(e) {
        e.preventDefault();

        try {
            const response = api.post('');
            alert(`confirmar presença: ${response}`);
            history.push('/app');
        } catch (e) {
            alert('Erro ao tentar confirmar presença.');
        }
    }

    function eventOwner () {
        return // ownerEventId == loggedUser? render confirmed users : render companion option
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

                <form onSubmit={handleConfirm}>
                    {/* <h5>Confirmar presença:</h5>
                    <input
                        placeholder="Acompanhante"
                        value={companion}
                        onChange={e => setCompanion(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Confirmar</button> */}

                    <div className="row list-container list-scroll">
                        <div className="col-md-12" style={{overflow: 'auto'}}> 
                            <ul className="list-group">
                                {['mariana@landix.com.br', 'calitao@landix.com.br', 'rodrigo@landix.com.br'].map(function(item) {
                                    return <li className="list-group-item" key={item}>
                                        <div className="mr-4" />
                                        <button type="button" className="btn btn-outline-danger" style={{border: 'none', marginRight: '7px'}}>
                                            <FiTrash2 size={16} />
                                        </button>
                                        {item}
                                    </li>;
                                })}
                            </ul>
                        </div>  
                    </div>

                    <button className="button" type="submit">Download</button>
                </form>

            </div>
        </div>
    );
}

export default NewEvent;