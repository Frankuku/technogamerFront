import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useCart } from "../../../hook/useCart.js";
import './Item.css';
import carrito from '../../../assets/img/iconos/carrito.png';

function Item({ producto }) {
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  // Verifica si ya está en el carrito
  const enCarrito = cart.some(item => item._id === producto._id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // evita que se active el <Link>
    e.stopPropagation();
    addToCart(producto);
    navigate("/carrito"); // redirige al carrito
  };

  return (
    <Link to={`/producto/${producto._id}`} className="col-sm-12 col-md-5 col-lg-3 p-2">
      <div className="card">
        <img
          src={`http://localhost:4000${producto.image}`}
          className="card-img-top"
          alt={producto.name}
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
            <p className="card-text">${producto.price}</p>

            {producto.stock > 0 ? (
              enCarrito ? (
                <Button variant="success" disabled>
                  ✔ Agregado
                </Button>
              ) : (
                <Button
                  className="btn-carrito"
                  onClick={handleAddToCart}
                >
                  <img src={carrito} alt="carrito" />
                </Button>
              )
            ) : (
              <span className="sin-stock">Sin stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Item;
