import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../../hook/useCart.js";
import Button from "../../../../components/button/Button.jsx";
import "./Resumen.css"

function Resumen() {
    const { state } = useLocation();
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const totalProductos = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const tipoPago = state?.tipoPago;
    const tipoEntrega = state?.tipoEntrega;
    const costoEnvio = state?.costoEnvio || 0;
    const Listo = () => {
        clearCart();
        navigate("/");
    }

    return (
        <div className="resumen-container">
            <h2>Resumen de la compra</h2>
            <p><strong>Método de pago:</strong> {tipoPago}</p>
            <p><strong>Tipo de entrega:</strong> {tipoEntrega}</p>
            <p><strong>Costo de envío:</strong> ${costoEnvio}</p>
            <p><strong>Total productos:</strong> ${totalProductos}</p>
            <hr />
            <h3><strong>Total final:</strong> ${totalProductos + costoEnvio}</h3>
            <Button texto="CONFIRMAR DATOS" type="button" onClick={Listo} />
        </div>
    );
}

export default Resumen;
