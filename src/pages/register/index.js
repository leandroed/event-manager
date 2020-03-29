import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/auth';
import api from '../../services/api';
import background from '../../assets/home.jpg';
import './styles.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const data = {
        username,
        email,
        password,
        adm: true,
      }

      const response = await api.post('register', data, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic Y29tLmxhbmRpeC4yMWFub3M6dGVzdGU=' } });

      console.log('Sucesso cadastro result: ', response)
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userInfo', response.data.username);
      login(`Bearer ${response.data.authorization.access_token}`);
      history.push('/app');
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
      <div className="container-register">
        <form className="form-register" onSubmit={handleRegister}>
          <input
            className="form-input"
            type="text"
            value={username}
            placeholder="Usuário"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="form-input"
            type="email"
            value={email}
            placeholder="Endereço de e-mail"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            value={password}
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="form-button btn btn-primary" type="submit">Cadastrar</button>
          <hr className="form-hr" />
          <Link className="form-link" to="/" style={{ textDecoration: 'none' }}>Fazer login</Link>
        </form>
      </div>
    </div>
  );
}
