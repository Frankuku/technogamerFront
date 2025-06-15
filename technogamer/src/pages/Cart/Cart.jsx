import { useId } from "react";
import './Cart.css';
import { useCart } from "../../hook/useCart";
import carrito from "../../assets/img/iconos/carrito.png";

function CartItem({ id, image, name, price, quantity, onAdd, onRemove }) {
    return (
        <li>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <div>${price}</div>
            <small>Cantidad: {quantity}</small>
            <div className="botones">
                <button onClick={onAdd}>+</button>
                <button onClick={onRemove}>🗑</button> {/* 👈 botón eliminar individual */}
            </div>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();
    const { cart, clearCart, addToCart, removeFromCart } = useCart(); // ✅ incluir removeFromCart

    return (
        <>
            <label className="cart-button iconos" htmlFor={cartCheckboxId}>
                <img src={carrito} alt="carrito" />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />

            <aside className="cart">
                <ul className="m-0 carrito-select">
                    {cart.length === 0 && <li >Vacío</li>}

                    {cart.map(product => (
                        <CartItem
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            quantity={product.quantity || 1}
                            onAdd={() => addToCart(product)}
                            onRemove={() => removeFromCart(product)} // ✅ pasar función individual
                        />
                    ))}
                </ul>

                {/* Si querés dejar un botón para vaciar todo el carrito también */}
                {cart.length > 0 && (
                    <button className="vaciar_carrito" onClick={clearCart}>🗑 Vaciar todo el carrito</button>
                )}
            </aside>
        </>
    );
}

export default Cart;
