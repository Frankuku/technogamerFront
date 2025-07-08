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
        const productId = product._id || product.id;

        setCart(prevCart => {
            const productInCart = prevCart.find(item => item._id === productId);
            if (productInCart) {
                return prevCart.map(item =>
                    item._id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, _id: productId, quantity: 1 }];
            }
        });
    };

    const decreaseQuantity = (product) => {
        const productId = product._id || product.id;

        setCart(prevCart =>
            prevCart.flatMap(item => {
                if (item._id === productId) {
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
        const productId = product._id || product.id;

        setCart(prevCart =>
            prevCart.filter(item => item._id !== productId)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            decreaseQuantity,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

