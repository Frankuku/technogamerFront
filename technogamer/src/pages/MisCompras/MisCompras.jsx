import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/api";
import { Container, Table, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function MisCompras() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user?._id) return;

    setUserId(user._id);

    axios
      .get(`${API_URL}/orders`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const allOrders = res.data.orders || res.data;
        // Filtrar por ID de usuario logueado
        const userOrders = allOrders.filter(
          (order) => order.user === user._id || order.user?._id === user._id
        );
        setOrders(userOrders);
      })
      .catch((err) => {
        console.error("Error al obtener las órdenes:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" />;

  if (orders.length === 0) return <p>No tienes órdenes aún.</p>;

  return (
    <Container className="mt-5">
      <h2 className="mb-3">Tus órdenes</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th># Orden</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Ver detalles</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.status}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <Link to={`/micompra/${order._id}`}>
                  <Button variant="primary" size="sm">
                    Detalles
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default MisCompras;
