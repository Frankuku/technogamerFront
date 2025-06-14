import { useContext } from "react";
import { CartContext } from "../components/CarritoCompra/CarritoCompra.jsx"


export const useCart = () => {
    const cart = useContext(CartContext)


    if (cart === undefined) {
        throw new Error('useCart nust be used within a CartProvider')
    }
    return cart
}