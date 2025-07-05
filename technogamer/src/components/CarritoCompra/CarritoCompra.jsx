import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const productInCart = prevCart.find(item => item.id === product.id);
            if (productInCart) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const decreaseQuantity = (product) => {
        setCart(prevCart =>
            prevCart.flatMap(item => {
                if (item.id === product.id) {
                    if (item.quantity > 1) {
                        return [{ ...item, quantity: item.quantity - 1 }];
                    } else {
                        return []; // elimina si es la última unidad
                    }
                }
                return [item];
            })
        );
    };

    const removeFromCart = (product) => {
        setCart(prevCart =>
            prevCart.filter(item => item.id !== product.id)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            decreaseQuantity, // ✅ necesario para el botón "-"
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
