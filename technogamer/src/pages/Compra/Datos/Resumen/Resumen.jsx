import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../hook/useCart.js";
import Button from "../../../../components/button/Button.jsx";
import API_URL from "../../../../config/api.js";
import axios from "axios";
import "./Resumen.css";

function Resumen() {
    const { state } = useLocation();
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const totalProductos = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const tipoPago = state?.tipoPago;
    const tipoEntrega = state?.tipoEntrega;
    const costoEnvio = state?.costoEnvio || 0;

    // ✅ Dirección real traída desde Entrega.jsx
    const direccion = state?.direccion || {
        street: "Calle Ejemplo",
        city: "Ciudad",
        postalCode: "0000",
        country: "Argentina"
    };

    const handleConfirmarCompra = async () => {
        const token = localStorage.getItem("token")?.replace(/^Bearer\s+/i, "");

        if (!token) {
            alert("Debes iniciar sesión para confirmar la compra.");
            navigate("/login");
            return;
        }

        if (cart.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }

        try {
            const items = cart.map(item => ({
                productId: item._id,
                quantity: item.quantity,
                price: item.price,
                productName: item.name
            }));

            const paymentInfo = tipoPago || "no-definido";

<<<<<<< HEAD
            const response = await axios.post(`${API_URL}/orders`, {
                items,
                shippingAddress: direccion,
=======
            console.log("Método de pago:", paymentInfo);
            console.log("Dirección de envío:", direccion);
            console.log("Items del pedido:", items);

            const response = await axios.post("http://localhost:4000/api/orders", {
                items,
                shippingAddress: direccion, // ✅ Dirección real
>>>>>>> 7a0939d (se corrigio el - y la pagina de producto)
                paymentInfo
            }, {
                headers: {
                    Authorization: token
                }
            });

<<<<<<< HEAD
            const orderId = response.data.order._id;

            clearCart();
            navigate(`/miCompra/${orderId}`); // ✅ Redirige a la página con el ID
=======
            console.log("Orden creada:", response.data);
            clearCart();
            navigate("/");
>>>>>>> 7a0939d (se corrigio el - y la pagina de producto)
        } catch (error) {
            console.error("Error al crear orden:", error.response?.data || error.message);
            alert("Error al confirmar la compra");
        }
    };
    return (
        <div className="resumen-container">
            <h2>Resumen de la compra</h2>
            <p><strong>Método de pago:</strong> {tipoPago}</p>
            <p><strong>Tipo de entrega:</strong> {tipoEntrega}</p>
            <p><strong>Calle:</strong> {direccion.street}</p>
            <p><strong>Código postal:</strong> {direccion.postalCode}</p>
            <p><strong>Costo de envío:</strong> ${costoEnvio}</p>
            <p><strong>Total productos:</strong> ${totalProductos}</p>
            <hr />
            <h3><strong>Total final:</strong> ${totalProductos + costoEnvio}</h3>
            <Button texto="CONFIRMAR COMPRA" type="button" onClick={handleConfirmarCompra} />
        </div>
    );
}

export default Resumen;
