import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Spinner,
  Pagination,
  Button,
} from "react-bootstrap";
import axios from "axios";
import ToastMessage from "../../../components/ToastMessage";
import API_URL from "../../../config/api";


const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", bg: "success" });

  const [statusFilter, setStatusFilter] = useState("");
  const [orderIdSearch, setOrderIdSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const token = localStorage.getItem("token");

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
  };

  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const params = { page: pageNumber, limit };

      if (statusFilter) params.status = statusFilter;
      if (orderIdSearch) params.orderId = orderIdSearch;
      if (userSearch) params.userSearch = userSearch;

      const { data } = await axios.get(`${API_URL}/orders`, 
        { params },
        {
          headers: {
          Authorization: `${token}`,
          },
        }
      );

      if (data.success) {
        setOrders(data.orders || []);
        setPage(data.currentPage || pageNumber);
        setTotalPages(data.totalPages || 1);
      } else {
        showToast("Error cargando órdenes", "danger");
      }
    } catch (err) {
      console.error(err);
      showToast("Error cargando órdenes", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, [statusFilter]);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchOrders(1);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  const handleSearch = () => {
    setPage(1);
    fetchOrders(1);
  };

  const handlePageChange = (num) => {
    if (num >= 1 && num <= totalPages) {
      setPage(num);
      fetchOrders(num);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Administrar Órdenes</h2>

      <Row className="mb-3 g-2">
        <Col md={3}>
          <Form.Select
            size="sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">-- Todos los estados --</option>
            <option value="pending">Pendiente</option>
            <option value="sent">Enviado</option>
            <option value="delivered">Entregado</option>
            <option value="cancelled">Cancelado</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Control
            size="sm"
            placeholder="Buscar por número de orden"
            value={orderIdSearch}
            onChange={(e) => setOrderIdSearch(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Control
            size="sm"
            placeholder="Buscar por usuario (email o username)"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </Col>

        <Col md={2}>
          <Button size="sm" onClick={handleSearch}>
            Buscar
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
                <th>ID</th>
                <th>Usuario</th>
                <th>Items</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No hay órdenes
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6)}</td>
                    <td>{order.user?.username || order.user?.email}</td>
                    <td>{order.totalItems}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        href={`/admin/orders/${order._id}`}
                      >
                        Ver
                      </Button>
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

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </Container>
  );
};

export default AdminOrdersPage;