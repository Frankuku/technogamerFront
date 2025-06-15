
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button";
import { useCart } from "../../../hook/useCart.js"
import './Item.css';
import carrito from '../../../assets/img/iconos/carrito.png'
function Item({ producto }) {
  const { addToCart, cart } = useCart()
  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }
  const isProductInCart = checkProductInCart(producto); // ✅ uso correcto
  return (

    <Link to={`/producto/${producto.id}`} className="col-sm-12 col-md-5 col-lg-3 p-2">
      <div className="card " >
        <img
          src={producto.image}
          className="card-img-top"
          alt={producto.image}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">
              {producto.name.length > 50
                ? producto.name.slice(0, 50) + '...'
                : producto.name}
            </h5>
          </div>
          <div className="d-flex justify-content-between gap-2 mt-3 w-100 align-items-end">
            <p className="card-text ">${producto.price}</p>
            <Button
              className="btn-carrito"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(producto);
                console.log("AGREGADO:", producto);
              }}
            >
              <img src={carrito} alt="carrito" />
              {isProductInCart && <span>✓</span>}
              {console.log(producto)}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Item