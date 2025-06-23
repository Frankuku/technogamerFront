import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button/Button';
import './Login.css';

function Login({ abrirModalRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.pass === pass) {
      localStorage.setItem("logged", true);
      onLoginSuccess();
    } else {
      alert("Datos incorrectos");
      navigate('/Error');

    }
  };
  return (
    <div className="login-container">
      <h2 className="login-title">INICIAR SESIÓN</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Dirección de correo electrónico*"
          className="login-input"
          required
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Contraseña*"
          className="login-input"
          required
        />

        <div className="login-options">
          <label className="checkbox-label">
            <input type="checkbox" />
            MANTENER LA SESIÓN INICIADA
          </label>
          <a href="#" className="forgot-link">¿Ha olvidado la contraseña?</a>
        </div>

        <div className="login-footer">
          <Button texto="ENVIAR" type="submit" />
          <button type="button" className="register-link border border-0" onClick={abrirModalRegister}>
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
