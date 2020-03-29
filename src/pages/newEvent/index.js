import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getToken } from '../../services/auth';
import api from '../../services/api.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const NewEvent = props => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(props?.location?.state?.date ? new Date(props.location.state.date) : new Date());
    const [image, setImage] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            address,
            description,
            date,
            image,
        };

        try {
            if (props?.location?.state === undefined) {
                await api.post('event', data, { headers: { 'Content-Type': 'application/json', 'Authorization': getToken() }});
            } else {
                await api.put(`event/${props.location.state.eventId}`, data, { headers: { 'Content-Type': 'application/json', 'Authorization': getToken() }});
            }
            history.push('/app')
        } catch (ex) {
            alert('Não foi possível realizar o cadastro do evento.');
        }
    }

    useEffect(() => {
        setName(props?.location?.state?.title ? props.location.state.title : '');
        setAddress(props?.location?.state?.address ? props.location.state.address : '');
        setDescription(props?.location?.state?.description ? props.location.state.description : '');
        setImage(props?.location?.state?.imgsrc? props.location.state.imgsrc : '');
    }, [props]);

    function handleFile (e) {
        const content = e.target.result;
        if (e.loaded < 356000) {
            setImage(content.toString())
        }
        else {
            alert('A imagem selecionada é muito grande.');
        }
    }

    function handleChangeFile (file) {
        let reader = new FileReader();
        reader.onloadend = handleFile;
        reader.readAsDataURL(file);
    }

    return (
        <div className="new-event-container">
            <div className="content">
                <section>
                    <div>
                        <h1>{props?.location?.state !== undefined ? 'Editar evento' : 'Cadastrar novo evento'}</h1>
                        <p>{ props?.location?.state !== undefined ? 'Faça a edição de seu evento.' : 'Faça o cadastro de seu evento.'}</p>
                    </div>

                    <Link className="back-link" to="/app">
                        <FiArrowLeft size={16} />
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <p style={{paddingLeft: '5px'}}>Imagem do evento
                        <input type="file" accept=".jpg" style={{border: 'none', marginLeft: '-25px', marginBottom: '-35px'}} onChange={e => handleChangeFile(e.target.files[0])} />
                    </p>

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

                    <button className="btn btn-outline-primary" style={{marginTop:'15px'}} type="submit">{props?.location?.state !== undefined ? 'Editar' : 'Cadastrar'}</button>
                </form>
            </div>
        </div>
    );
}

export default NewEvent;