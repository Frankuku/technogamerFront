import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../hook/useCart.js";
import Button from "../../../../components/button/Button.jsx";
import axios from "axios";
import "./Resumen.css";

function Resumen() {
    const { state } = useLocation();
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    // Calcula el total de productos en el carrito (precio * cantidad)
    const totalProductos = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const tipoPago = state?.tipoPago;
    const tipoEntrega = state?.tipoEntrega;
    const costoEnvio = state?.costoEnvio || 0;

    const Listo = () => {
        clearCart();
        navigate("/");
    }

    const handleConfirmarCompra = async () => {
        // 🔐 Trae el token del login desde localStorage y lo limpia por si tiene "Bearer " duplicado
        const token = localStorage.getItem("token")?.replace(/^Bearer\s+/i, "");

        // Verifica si el usuario está logueado
        if (!token) {
            alert("Debes iniciar sesión para confirmar la compra.");
            navigate("/login");
            return;
        }

        // Verifica que el carrito no esté vacío
        if (cart.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }

        try {
            // Mapea los productos del carrito al formato que espera el backend
            const items = cart.map(item => ({
                productId: item._id,           // Obligatorio y debe existir
                quantity: item.quantity,       // Obligatorio
                price: item.price,             // Obligatorio
                productName: item.name    // Obligatorio, asegurate que venga así del backend
            }));

            // Dirección de envío fija (puede reemplazarse por un formulario en el futuro)
            const shippingAddress = {
                street: "Calle Ejemplo",  // Como no querés cambiar el backend, valores fijos
                city: "Ciudad",
                postalCode: "0000",
                country: "Argentina"
            };

            const paymentInfo = tipoPago || "no-definido"; // ⚠️ El backend espera un string, no un objeto

            // Debugging: log para verificar antes de enviar
            console.log("Método de pago:", paymentInfo);
            console.log("Dirección de envío:", shippingAddress);
            console.log("Items del pedido:", items);

            // Le estás mandando esto:
            // { items, shippingAddress, paymentInfo }

            // El backend espera este formato:
            /*
            {
                "items": [
                    {
                        "productId": "686310d433269bded63d419e",
                        "quantity": 1,
                        "price": 1000,
                        "productName": "Mouse Logitech"
                    }
                ],
                "shippingAddress": {
                    "street": "Calle Principal 123",
                    "city": "Ciudad Ejemplo",
                    "postalCode": "12345",
                    "country": "Argentina"
                },
                "paymentInfo": "cash"
            }
            */
            console.log("Token:", token);
            const response = await axios.post("http://localhost:4000/api/orders", {
                items,
                shippingAddress,
                paymentInfo
            }, {
                headers: {
                    Authorization: token // ✅ El backend lo espera así, sin "Bearer"
                }
            });

            console.log("Orden creada:", response.data);
            clearCart(); // Limpia el carrito
            navigate("/"); // Redirige al inicio
        } catch (error) {
            // Muestra mensaje en caso de error
            console.error("Error al crear orden:", error.response?.data || error.message);
            alert("Error al confirmar la compra");
        }
    };

    return (
        <div className="resumen-container">
            <h2>Resumen de la compra</h2>
            <p><strong>Método de pago:</strong> {tipoPago}</p>
            <p><strong>Tipo de entrega:</strong> {tipoEntrega}</p>
            <p><strong>Costo de envío:</strong> ${costoEnvio}</p>
            <p><strong>Total productos:</strong> ${totalProductos}</p>
            <hr />
            <h3><strong>Total final:</strong> ${totalProductos + costoEnvio}</h3>
            <Button texto="CONFIRMAR COMPRA" type="button" onClick={handleConfirmarCompra} />
        </div>
    );
}

export default Resumen;
