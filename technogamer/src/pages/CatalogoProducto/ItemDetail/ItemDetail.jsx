import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ItemDetail.css';
import Button from '../../../components/button/Button';
import { useCart } from "../../../hook/useCart";
import ToastMessage from "../../../components/ToastMessage";
import API_URL from '../../../config/api';
import API_URL_IMAGE from '../../../config/apiImage';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, isStockAvailable, cartCheckboxRef } = useCart();
  const [toast, setToast] = useState({ show: false, message: "", bg: "" });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${API_URL}/products/${id}`);
        if (!res.data.success || !res.data.product) {
          throw new Error("Producto no encontrado");
        }
        setItem(res.data.product);
      } catch (err) {
        console.error("Error al cargar el producto:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleBuyNow = () => {
    if (!isStockAvailable(item)) {
      setToast({
        show: true,
        message: "No hay más stock disponible de este producto.",
        bg: "danger"
      });
      return;
    }

    addToCart(item);
    if (cartCheckboxRef?.current) {
      cartCheckboxRef.current.checked = true;
    }

    setToast({
      show: true,
      message: "¡Producto agregado al carrito!",
      bg: "success"
    });
  };

  if (loading) return <p>Cargando producto...</p>;
  if (!item) return <p>Producto no encontrado.</p>;

  return (
    <>
      <div className='item_producto'>
        <div>
          <img src={`${API_URL_IMAGE}${item.image}`} alt="producto_img" />
        </div>
        <div className='informacion'>
          <h3>{item.name}</h3>
          <p className='descripcion'>Marca: {item.subcategory}</p>
          <p className='descripcion'>Descripción: {item.description}</p>
          <div className='precio'>
            <p className='precio_oficial'>Precio especial: <span>${item.price}.00</span></p>
            <p>12 cuotas de ${(item.price / 12).toFixed(2)}</p>
            <p>Precio de lista: ${(item.price * 2).toFixed(2)}</p>
          </div>

          {item.stock > 0 ? (
            <Button texto="Comprar ahora" onClick={handleBuyNow} />
          ) : (
            <p className="sin-stock">Sin stock</p>
          )}

          <p className='garantia_y_stock'>Garantía 12 meses</p>
          <p className='garantia_y_stock'>Stock: {item.stock}</p>
        </div>
      </div>

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </>
  );
}

export default ItemDetail;
