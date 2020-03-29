import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FiLogOut } from 'react-icons/fi';
import { getToken, logout } from '../../services/auth';
import api from '../../services/api';
import Card from '../../components/Cards/CardUI';
import img1 from '../../assets/home.jpg';
import './styles.css';

export default function Home() {
    const [events, setEvents] = useState([]);

    const history = useHistory();
    const userInfo = localStorage.getItem('userInfo');

    useEffect(() => {
        api.get('event', { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': getToken() } }).then(response => {
            setEvents(response.data);
        })
    }, []);

    function logOut(e) {
        e.preventDefault();
        
        logout()
        history.push('/');
    }

    return (
        
        <div className="profile-container">
            <header>
                <span>Bem vindo, {userInfo}</span>

                <Link style={{ textDecoration: 'none' }} className="btn btn-outline-primary" to="/createEvent">Criar novo evento</Link>
                <button type="button" onClick={logOut}>
                    <FiLogOut size={15} />
                </button>
            </header>
            
            <div className="container-fluid d-flex justify-content-center container-align">
                <div className="row">

                    {events.map(event => (
                        <div className="col-md-4" key={event.id} style={{ paddingBottom: '30px' }}>
                            <Card imgsrc={img1} title={event.name} description={event.description} date={event.date} address={event.address} eventId={event.id} user={event.user} />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}