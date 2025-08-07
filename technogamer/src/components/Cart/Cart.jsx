import { useId, useState, useEffect } from "react";
import './Cart.css';
import { useCart } from "../../hook/useCart.js";
import carrito from "../../assets/img/iconos/carrito.png";
import Button from "../button/Button.jsx";
import { Link } from "react-router-dom";
import ToastMessage from "../ToastMessage.jsx";
import API_URL_IMAGE from "../../config/apiImage.js";

function CartItem({ product, decreaseQuantity, onAdd, onRemove }) {
    return (
        <li>
            <img src={`${API_URL_IMAGE}${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <div>${product.price * product.quantity}</div>
            <small>Cantidad: {product.quantity}</small>
            <div className="botones">
                <button
                    onClick={() => onAdd.handler()}
                    disabled={!onAdd.stockAvailable}
                    title={!onAdd.stockAvailable ? "No hay más stock" : "Agregar uno más"}
                >
                    +
                </button>
                <button onClick={() => decreaseQuantity(product)}>-</button>
                <button onClick={() => onRemove(product)}>🗑</button>
            </div>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();

    const {
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        isStockAvailable,
        cartCheckboxRef,
    } = useCart();

    const [toast, setToast] = useState({
        show: false,
        message: '',
        bg: 'danger'
    });

    const total = cart.reduce(
        (acc, product) => acc + product.price * (product.quantity || 1),
        0
    );

    // Mostrar toast con mensaje personalizado
    const showToast = (message) => {
        setToast({ show: true, message, bg: 'danger' });
    };

    // Control de stock y toast en el botón +
    const handleAddToCart = (product) => {
        if (isStockAvailable(product)) {
            addToCart(product);
        } else {
            showToast(`¡Máximo stock alcanzado para "${product.name}"!`);
        }
    };

    // Ocultar toast automáticamente después de 3 segundos
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    return (
        <>
            <label className="cart-button iconos" htmlFor={cartCheckboxId}>
                <img src={carrito} alt="carrito" />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden ref={cartCheckboxRef} />

            <aside className="cart">
                <ul className="m-0 carrito-select">
                    {cart.length === 0 && <li>Vacío</li>}

                    {cart.map(product => (
                        <CartItem
                            key={product._id}
                            product={product}
                            onAdd={{
                                handler: () => handleAddToCart(product),
                                stockAvailable: isStockAvailable(product)
                            }}
                            onRemove={removeFromCart}
                            decreaseQuantity={decreaseQuantity}
                        />
                    ))}
                </ul>

                {cart.length > 0 && (
                    <>
                        <div className="total-precio">
                            <strong>Total: ${total}</strong>
                        </div>
                        <Link
                            to="/compra"
                            onClick={() => (cartCheckboxRef.current.checked = false)}
                        >
                            <Button texto="Seguir con la compra" />
                        </Link>
                    </>
                )}
            </aside>

            <ToastMessage
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                message={toast.message}
                bg={toast.bg}
            />
        </>
    );
}

export default Cart;
