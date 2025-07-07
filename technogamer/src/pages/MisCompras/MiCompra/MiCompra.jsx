import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/api";
import { Container, Table, Spinner, Row, Col, Button, Alert } from "react-bootstrap";

function MiCompra() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No estás autenticado.");
            setLoading(false);
            return;
        }

        axios.get(`${API_URL}/orders/${orderId}`, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            setOrder(res.data.order || res.data);
        })
        .catch(err => {
            console.error("Error al obtener la orden:", err);
            setError("No se pudo cargar la orden.");
        })
        .finally(() => {
            setLoading(false);
        });
    }, [orderId]);

    const obtenerEstado = (estado) => {
        switch (estado) {
            case "delivered": return "Entregado";
            case "sent": return "Enviado";
            case "pending": return "Pendiente";
            default: return estado;
        }
    };

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;
    if (!order) return <p className="mt-4 text-center">No se encontró la orden.</p>;

    return (
        <Container className="mt-5">
            <h2 className="mb-3">¡Tu compra!</h2>
            <p><strong>Orden:</strong> #{order._id}</p>
            <p><strong>Estado:</strong> {obtenerEstado(order.status)}</p>
            <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <hr />

            <Row className="mb-3">
                <Col md={6}>
                    <h5>Dirección de envío</h5>
                    {order.shippingAddress ? (
                        <p>
                            {order.shippingAddress.street}, {order.shippingAddress.city} <br />
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                    ) : (
                        <p>No se especificó dirección.</p>
                    )}
                </Col>
                <Col md={6}>
                    <h5>Método de pago</h5>
                    <p>{order.paymentInfo || "No especificado"}</p>
                </Col>
            </Row>

            <h5 className="mt-4">Productos comprados</h5>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items?.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Row className="justify-content-end mt-4">
                <Col md={4} className="text-end">
                    <h5>Total: ${order.totalPrice?.toFixed(2)}</h5>
                </Col>
            </Row>

            <div className="mt-4 text-center">
                <Link to="/miscompras">
                    <Button variant="success">Volver a Mis Compras</Button>
                </Link>
            </div>
        </Container>
    );
}

export default MiCompra;
