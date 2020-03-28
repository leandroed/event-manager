import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { login } from '../../services/auth';
import background from '../../assets/home.jpg';
import './styles.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
      e.preventDefault();

      const credentials = `username=${username}&password=${password}&grant_type=password`;

      try {
        const response = await api.post('auth/token', credentials, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic Y29tLmxhbmRpeC4yMWFub3M6dGVzdGU=' } });
        const user = await api.get('me', { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${response.data.access_token}`  }});

        localStorage.setItem('userId', user.data.id);
        localStorage.setItem('userInfo', user.data.username);
        login(`Bearer ${response.data.access_token}`);

        history.push('/app');
      } catch (e) {
        alert('Erro não foi possível realizar o login.');
      }
    }

    return (
      <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="container-login">
          <form className="form-login" onSubmit={handleLogin}>
            <input
              className="form-input"
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />

            <input 
              className="form-input"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button className="form-button btn btn-primary" type="submit">Entrar</button>
            <hr className="form-hr" />
            <Link className="form-link" to="/register" style={{ textDecoration: 'none' }}>Criar conta</Link>
          </form>
        </div>
      </div>
    );
}