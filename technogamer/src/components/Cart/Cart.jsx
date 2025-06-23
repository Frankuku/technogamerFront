import { useId, useRef } from "react";
import './Cart.css';
import { useCart } from "../../hook/useCart.js"
import carrito from "../../assets/img/iconos/carrito.png";
import Button from "../button/Button.jsx";
import { Link } from "react-router-dom";

function CartItem({ id, image, name, price, quantity, onAdd, onRemove }) {
    return (
        <li>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <div>${price * quantity}</div>
            <small>Cantidad: {quantity}</small>
            <div className="botones">
                <button onClick={onAdd}>+</button>
                <button onClick={onAdd}>-</button>
                <button onClick={onRemove}>🗑</button> {/* 👈 botón eliminar individual */}
            </div>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();
    const checkboxRef = useRef();
    const { cart, addToCart, removeFromCart } = useCart();

    const total = cart.reduce(
        (acc, product) => acc + product.price * (product.quantity || 1),
        0
    );

    return (
        <>
            <label className="cart-button iconos" htmlFor={cartCheckboxId}>
                <img src={carrito} alt="carrito" />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden ref={checkboxRef} />

            <aside className="cart">
                <ul className="m-0 carrito-select">
                    {cart.length === 0 && <li>Vacío</li>}

                    {cart.map(product => (
                        <CartItem
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity || 1}
                            onAdd={() => addToCart(product)}
                            onRemove={() => removeFromCart(product)}
                        />
                    ))}
                </ul>

                {cart.length > 0 && (
                    <>
                        <div className="total-precio">
                            <strong>Total: ${total}</strong>
                        </div>
                        <Link to="/compra" onClick={() => checkboxRef.current.checked = false}>
                            <Button texto="Seguir con la compra" />
                        </Link>
                    </>
                )}
            </aside>
        </>
    );
}

export default Cart;
