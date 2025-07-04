import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_URL from '../../config/api.js'; // ajustá la ruta según la carpeta
import Button from '../button/Button';
import './Login.css';

function Login({ abrirModalRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && pass === "1234") {
      // Guardar rol admin en localStorage
      localStorage.setItem("logged", true);
      localStorage.setItem("rol", "admin");
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));

      // Redirigir a /Admin
      navigate("/admin");
      return; // Terminar aquí para no hacer la llamada al backend
    }
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password: pass })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Datos incorrectos");
        navigate("/Error");
        return;
      }

      const { user, token } = data;

      // Guardar token y rol en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("logged", true);
      localStorage.setItem("rol", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirección por rol
      if (user.role === "admin") {
        navigate("/Admin");
      } else {
        onLoginSuccess(); // función que podés usar para cerrar modal, recargar, etc.
      }

    } catch (error) {
      console.error("Error al hacer login:", error);
      alert("Error de conexión con el servidor");
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
