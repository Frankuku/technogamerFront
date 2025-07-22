import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button/Button';
import API_URL from '../../config/api.js';
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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // limpiar error al escribir
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validaciones
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.apellido) newErrors.apellido = 'El apellido es obligatorio';
    if (!formData.email) newErrors.email = 'El email es obligatorio';
    if (!formData.pass) newErrors.pass = 'La contraseña es obligatoria';
    if (!formData.repitePass) newErrors.repitePass = 'Debes repetir la contraseña';

    if (formData.pass && formData.pass.length < 6) {
      newErrors.pass = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.pass !== formData.repitePass) {
      newErrors.repitePass = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // Si hay errores, detener

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
        abrirModalLogin();
      } else {
        setErrors({ general: data.message || "Error al registrar usuario" });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Error del servidor al registrar usuario" });
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
        {errors.nombre && <p className="error-text">{errors.nombre}</p>}

        <input
          type="text"
          name="apellido"
          placeholder="Apellido*"
          value={formData.apellido}
          onChange={handleChange}
          className="register-input"
        />
        {errors.apellido && <p className="error-text">{errors.apellido}</p>}

        <input
          type="email"
          name="email"
          placeholder="Dirección de correo electrónico*"
          value={formData.email}
          onChange={handleChange}
          className="register-input"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          name="pass"
          placeholder="Contraseña*"
          value={formData.pass}
          onChange={handleChange}
          className="register-input"
        />
        {errors.pass && <p className="error-text">{errors.pass}</p>}

        <input
          type="password"
          name="repitePass"
          placeholder="Repetir contraseña*"
          value={formData.repitePass}
          onChange={handleChange}
          className="register-input"
        />
        {errors.repitePass && <p className="error-text">{errors.repitePass}</p>}

        {errors.general && <p className="error-text">{errors.general}</p>}

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
