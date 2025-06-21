import React from 'react'
import './ItemDetail.css';
import Button from '../../../components/button/Button';
import { useCart } from "../../../hook/useCart";

function ItemDetail({ item }) {
  const { addToCart } = useCart(); // ✅

  return (
    <div className='item_producto'>
      <div>
        <img src={item.image} alt="producto_img" />
      </div>
      <div className='informacion'>
        <h3>{item.name}</h3>
        <p className='descripcion'>Marca: {item.subcategory}</p>
        <p className='descripcion'>Descripcion: {item.description}</p>
        <div className='precio'>
          <p className='precio_oficial'>Precio especial: <span> ${item.price}.00</span></p>
          <p>12 cuotas de ${(item.price / 12).toFixed(2)}</p>
          <p>Precio de la lista ${(item.price * 2).toFixed(2)}</p>
        </div>

        <Button texto="Comprar ahora" onClick={() => addToCart(item)} />

        <p className='garantia_y_stock'>Garantia 12 meses</p>
        <p className='garantia_y_stock'>stock : {item.stock}</p>
      </div>
    </div>
  )
}

export default ItemDetail;
