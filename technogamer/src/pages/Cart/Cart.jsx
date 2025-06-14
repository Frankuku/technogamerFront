import { useId } from "react"
import './Cart.css'
import carrito from "../../assets/img/iconos/carrito.png"




export function Cart() {
    const cartCheckboxId = useId()

    return (
        <>
            <label className="cart-button iconos" htmlFor={cartCheckboxId}>
                <img src={carrito} alt="carrito" />

            </label>
            <input id={cartCheckboxId} type='checkbox' hidden />



            <aside className="cart">
                <ul>
                    <li>
                        <img src="https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39742_Teclado_Mecanico_Logitech_PRO_X_TKL_Wireless_Lightspeed_1ms_White_RGB_Switch_GX_50Hs_e564c8a6-grn.jpg" alt="" />
                        <h3>reclado</h3>

                        <div>
                            $465456465
                        </div>
                        <small>
                            qty:1
                        </small>
                        <button>+</button>
                        <button>limpiar</button>
                    </li>
                </ul>
            </aside>
        </>
    )

}
export default Cart;
