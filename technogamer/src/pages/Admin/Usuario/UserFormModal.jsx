import { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import API_URL from "../../../config/api";

const UserFormModal = ({ show, onHide, user, onSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
        role: user.role || "user",
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    }
    setErrors({});
  }, [user, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, role } = formData;

    const newErrors = {};
    if (!username.trim()) newErrors.username = "El nombre es requerido";
    if (!email.trim()) newErrors.email = "El email es requerido";
    if (!user && !password.trim()) newErrors.password = "La contraseña es requerida";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);

    try {
      if (user) {
        await axios.put(`${API_URL}/users/${user._id}`, {
          username,
          email,
          role,
          ...(password ? { password } : {}),
        });
      } else {
        await axios.post(`${API_URL}/users`, {
          username,
          email,
          password,
          role,
        });
      }

      onSave();
      onHide();
    } catch (err) {
      console.error("Error al guardar usuario", err);
      setErrors({ general: "Ocurrió un error al guardar. Verificá los datos." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={handleChange} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Editar Usuario" : "Nuevo Usuario"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña {user && "(opcional)"}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder={user ? "Dejar en blanco para no cambiar" : ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? <Spinner animation="border" size="sm" /> : "Guardar"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserFormModal;
