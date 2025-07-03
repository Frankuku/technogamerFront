import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Spinner, Button, Form } from "react-bootstrap";
import axios from "axios";
import ToastMessage from "../../../components/ToastMessage";
import API_URL from "../../../config/api";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", bg: "success" });

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
  };

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/orders/${id}`);
      if (data.success) {
        setOrder(data.order);
        setStatus(data.order.status);
      } else {
        showToast("No se pudo cargar la orden", "danger");
      }
    } catch (err) {
      console.error(err);
      showToast("Error al cargar la orden", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await axios.patch(
        `${API_URL}/orders/${id}/status`,
        { status: newStatus }
      );
      setStatus(newStatus);
      showToast("Estado actualizado", "success");
    } catch (err) {
      console.error(err);
      showToast("Error al actualizar estado", "danger");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (!order) return null;

  return (
    <Container className="mt-4">
        <Button
        variant="secondary"
        onClick={() => navigate('/admin/orders', { state: { refresh: true } })}
        className="mb-3"
        >
        ← Volver
        </Button>
      <h3>Detalle de Orden #{order._id}</h3>
      <Row className="mb-3">
        <Col md={6}>
          <h5>Usuario</h5>
          <p>{order.user.username || order.user.email}</p>
        </Col>
        <Col md={6}>
          <h5>Fecha</h5>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={4}>
          <h5>Dirección de envío</h5>
          <p>
            {order.shippingAddress.street}, {order.shippingAddress.city} <br />
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
        </Col>
        <Col md={4}>
          <h5>Método de pago</h5>
          <p>{order.paymentInfo}</p>
        </Col>
        <Col md={4}>
          <h5>Estado</h5>
          <Form.Select value={status} onChange={handleStatusChange} size="sm">
            <option value="pending">Pendiente</option>
            <option value="sent">Enviado</option>
            <option value="delivered">Entregado</option>
            <option value="cancelled">Cancelado</option>
          </Form.Select>
        </Col>
      </Row>
      <h5>Items</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="justify-content-end">
        <Col md={4} className="text-end">
          <h5>Total items: {order.totalItems}</h5>
          <h5>Total precio: ${order.totalPrice.toFixed(2)}</h5>
        </Col>
      </Row>

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </Container>
  );
};

export default OrderDetailPage;
