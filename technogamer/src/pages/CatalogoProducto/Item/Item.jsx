import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useCart } from "../../../hook/useCart.js";
import ToastMessage from "../../../components/ToastMessage.jsx";
import './Item.css';
import carrito from '../../../assets/img/iconos/carrito.png';

function Item({ producto }) {
  const { addToCart, isStockAvailable, cartCheckboxRef } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isStockAvailable(producto)) {
      addToCart(producto);
      setToastMessage("¡Producto agregado al carrito!");
      setToastBg("success");

      if (cartCheckboxRef?.current) {
        cartCheckboxRef.current.checked = true;
      }
    } else {
      setToastMessage("Ya agregaste todo el stock disponible.");
      setToastBg("danger");
    }

    setShowToast(true);
  };

  return (
    <>
      <Link to={`/producto/${producto._id}`} className="col-sm-12 col-md-5 col-lg-3 p-2">
        <div className="card">
          <img
            src={`https://technogamer.onrender.com${producto.image}`}
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
                <Button
                  className="btn-carrito"
                  onClick={handleAddToCart}
                >
                  <img src={carrito} alt="carrito" />
                </Button>
              ) : (
                <span className="sin-stock">Sin stock</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <ToastMessage
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        bg={toastBg}
      />
    </>
  );
}

export default Item;
