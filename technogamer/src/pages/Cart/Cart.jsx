// Cart.jsx

import { useId } from "react";
import './Cart.css';
import { useCart } from "../../hook/useCart";
import carrito from "../../assets/img/iconos/carrito.png";

// Este componente recibe props correctamente
function CartItem({ id, image, name, price, quantity, onAdd }) {
    return (
        <li key={id}>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <div>${price}</div>
            <small>Cantidad: {quantity}</small>
            <button onClick={onAdd}>+</button>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();
    const { cart, clearCart, addToCart } = useCart();

    return (
        <>
            <label className="cart-button iconos" htmlFor={cartCheckboxId}>
                <img src={carrito} alt="carrito" />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />

            <aside className="cart">
                <ul>
                    {cart.length === 0 && <li>🛒 Carrito vacío</li>}

                    {cart.map(product => (
                        <CartItem
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity || 1}
                            onAdd={() => addToCart(product)}
                        />
                    ))}
                </ul>

                {cart.length > 0 && (
                    <button onClick={clearCart}>🗑 Limpiar carrito</button>
                )}
            </aside>
        </>
    );
}

export default Cart;
