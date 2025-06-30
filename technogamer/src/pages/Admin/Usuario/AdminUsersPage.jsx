import { useEffect, useState, useRef } from "react";
import {
  Table,
  Button,
  Container,
  Spinner,
  Pagination,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import ToastMessage from "../../../components/ToastMessage";
import UserFormModal from "./UserFormModal";
import API_URL from "../../../config/api";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", bg: "success" });
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debounceRef = useRef(null);

  const limit = 5;

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
  };

  const fetchUsers = async (pageNumber = 1, search = searchTerm) => {
    try {
      setLoading(true);
      const params = { page: pageNumber, limit };
      if (search.trim()) params.search = search;

      const res = await axios.get(`${API_URL}/users`, { params });
      setUsers(res.data.users || []);
      setPage(res.data.currentPage || 1);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      showToast("Error al cargar usuarios", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchUsers(1, searchTerm);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [searchTerm]);



  const handlePageChange = (num) => {
    if (num >= 1 && num <= totalPages) {
      fetchUsers(num);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        showToast("Usuario eliminado", "danger");
        fetchUsers(page);
      } catch (err) {
        showToast("Error al eliminar usuario", "danger");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleNew = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleSave = () => {
    fetchUsers(page);
    showToast("Usuario guardado", "success");
  };

  return (
    <Container className="mt-4">
      <h2>Administrar Usuarios</h2>

      <Row className="align-items-center mb-3" style={{ gap: "8px" }}>
        <Col xs="auto">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Buscar por email o nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col xs="auto" className="ms-auto">
          <Button size="sm" onClick={handleNew}>
            + Nuevo Usuario
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="warning" onClick={() => handleEdit(user)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(user._id)}>
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          <Pagination className="justify-content-center">
            <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
            <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Pagination.Item
                key={num}
                active={num === page}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
          </Pagination>
        </>
      )}

      <UserFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={selectedUser}
        onSave={handleSave}
      />

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </Container>
  );
};

export default AdminUsersPage;
