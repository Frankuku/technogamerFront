import { useCart } from "../../hook/useCart.js";
import Carrito from "../../assets/img/iconos/carrito.png"
import Button from "../../components/button/Button.jsx"
import { useNavigate } from "react-router-dom";
import "./Compra.css"
function Compra({ setModalType }) {
    const { cart, clearCart, addToCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleClick = () => {
        const isLogged = localStorage.getItem("logged");
        console.log("Continuar clickeado");
        if (isLogged === "true") {
            navigate("/Datos");
        } else {
            setModalType("login");
            console.log("modalType seteado a login");
        }
    };

    return (
        <div className="compra-container">

            {cart.length === 0 ? (
                <div className="resumen">
                    <div className="productos_compra text-center align-items-center" >
                        <img src={Carrito} alt="Carrito" width={55} />
                        <p className="no_item">Aún no hay items en el carrito!</p>
                    </div>

                    <div className="productos_compra total">
                        <p>Resumen de pedido <br /> Total: ${total}</p>
                    </div>
                </div>
            ) : (
                <div className="resumen">
                    <ul className="productos_compra">
                        {cart.map((item) => (
                            <li key={item.id} className="lista_resumen">
                                <div className="producto_elegido">
                                    <img src={`https://technogamer.onrender.com${item.image}`} alt={item.name} width={80} />
                                    <p>{item.name}</p>
                                </div>
                                <div className="acciones">
                                    <button onClick={() => addToCart(item)}>+ </button>
                                    <p>{item.quantity}</p>
                                    <p> ${item.price * item.quantity}</p>
                                    <button onClick={() => removeFromCart(item)}>🗑</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="productos_compra total">
                        <p>Resumen de pedido <br /> Total: ${total}</p>
                        <div>
                            <Button texto="Continuar" onClick={handleClick} />
                            <Button texto="🗑" onClick={clearCart}> </Button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
export default Compra;
