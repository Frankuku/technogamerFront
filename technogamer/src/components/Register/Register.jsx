import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button/Button'; // Asegúrate que existe
import API_URL from '../../config/api.js'; // ajustá la ruta según la carpeta
import './Register.css';

function Register({ abrirModalLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    codigoArea: '',
    telefono: '',
    pass: '',
    repitePass: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ 1. Validar campos vacíos
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.pass || !formData.repitePass) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // ✅ 2. Validar longitud mínima de contraseña
    if (formData.pass.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // ✅ 3. Validar que las contraseñas coincidan
    if (formData.pass !== formData.repitePass) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const user = {
      username: `${formData.nombre} ${formData.apellido}`,
      email: formData.email,
      password: formData.pass,
      telefono: `+${formData.codigoArea} ${formData.telefono}`
    };

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Usuario registrado con éxito");
        abrirModalLogin();
      } else {
        alert(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error del servidor al registrar usuario");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">REGISTRARSE</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre*"
          value={formData.nombre}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido*"
          value={formData.apellido}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Dirección de correo electrónico*"
          value={formData.email}
          onChange={handleChange}
          className="register-input"
        />

        <input
          type="password"
          name="pass"
          placeholder="Contraseña*"
          value={formData.pass}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="password"
          name="repitePass"
          placeholder="Repetir contraseña*"
          value={formData.repitePass}
          onChange={handleChange}
          className="register-input"
        />

        <div className="register-footer">
          <Button texto="REGISTRARME" type="submit" />
          <button type="button" className="login-link border border-0" onClick={abrirModalLogin}>
            ¿Ya tienes cuenta?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
