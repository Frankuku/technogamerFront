import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/api";
import { Container, Table, Spinner, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function MiCompra() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

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
            })
            .finally(() => {
                setLoading(false);
            });
    }, [orderId]);

    if (loading) return <Spinner animation="border" />;
    if (!order) return <p>No se encontró la orden.</p>;

    return (
        <Container className="mt-5">
            <h2 className="mb-3">¡Tu compra!</h2>
            <p><strong>Orden:</strong> #{order._id}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <hr />

            <Row className="mb-3">
                <Col md={6}>
                    <h5>Dirección de envío</h5>
                    <p>
                        {order.shippingAddress.street}, {order.shippingAddress.city} <br />
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                </Col>
                <Col md={6}>
                    <h5>Método de pago</h5>
                    <p>{order.paymentInfo}</p>
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

            <Row className="justify-content-end mt-4">
                <Col md={4} className="text-end">
                    <h5>Total: ${order.totalPrice.toFixed(2)}</h5>
                </Col>
            </Row>

            <div className="mt-4 text-center">
                <Link to="/miscompras">
                    <Button variant="success">Volver al inicio</Button>
                </Link>
            </div>
        </Container>
    );
}

export default MiCompra;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/api";
import { Container, Table, Spinner, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function MiCompra() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

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
            })
            .finally(() => {
                setLoading(false);
            });
    }, [orderId]);

    if (loading) return <Spinner animation="border" />;
    if (!order) return <p>No se encontró la orden.</p>;

    return (
        <Container className="mt-5">
            <h2 className="mb-3">¡Tus compra!</h2>
            <p><strong>Orden:</strong> #{order._id}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <hr />

            <Row className="mb-3">
                <Col md={6}>
                    <h5>Dirección de envío</h5>
                    <p>
                        {order.shippingAddress.street}, {order.shippingAddress.city} <br />
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                </Col>
                <Col md={6}>
                    <h5>Método de pago</h5>
                    <p>{order.paymentInfo}</p>
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

            <Row className="justify-content-end mt-4">
                <Col md={4} className="text-end">
                    <h5>Total: ${order.totalPrice.toFixed(2)}</h5>
                </Col>
            </Row>

            <div className="mt-4 text-center">
                <Link to="/miscompras">
                    <Button variant="success">Volver al inicio</Button>
                </Link>
            </div>
        </Container>
    );
}

export default MiCompra;