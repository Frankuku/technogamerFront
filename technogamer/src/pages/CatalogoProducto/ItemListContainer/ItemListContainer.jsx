import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import pedirProductos from '../js/pedirProductos';
import ItemList from '../ItemList/ItemList';
import Category from '../Categoryfilter/Category';
import './ItemListContainer.css';
import pronto from '../../../assets/img/iconos/pronto.png';
import API_URL from '../../../config/api';
import axios from "axios";

function ItemListContainer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const textoBusqueda = searchParams.get('buscar')?.toLowerCase() || '';  // Obtiene el parámetro de búsqueda de la URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category, subcategory } = useParams(); // usa también la subcategoría si está definida

  const fetchProducts = async (pageNumber = 1, search = "", category = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // 🔄 MOVIDO AQUÍ PARA EVITAR "token is not defined"
      const params = {
        page: pageNumber,
        limit: 5,
      };
      if (search.trim()) params.search = search;
      if (category) params.category = category;

      const res = await axios.get(`${API_URL}/products`, {
        params,
        headers: { Authorization: token } // ✅ CORRECTO USO DE HEADERS
        // el body ---> el contenido
      });

      console.log(res);
      console.log(res.data);
      setProducts(res.data.products);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar productos", err);
      //showToast("Error al cargar productos", "danger");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [])


  /*   useEffect(() => {
      console.log('Texto de búsqueda:', textoBusqueda);  // Verifica el valor del texto de búsqueda
      pedirProductos()
        .then((res) => {
          let filtered = res;

          // Filtrado por categoría
          if (category) {
            filtered = filtered.filter((prod) => prod.category === category);
          }

          // Filtrado por subcategoría
          if (subcategory) {
            filtered = filtered.filter((prod) => prod.subcategory === subcategory);
          }

          // Filtrado por nombre (si se encuentra texto en la búsqueda)
          if (textoBusqueda) {
            filtered = filtered.filter((prod) =>
              prod.name.toLowerCase().includes(textoBusqueda)
            );
          }

          setProductos(filtered);  // Actualiza el estado con los productos filtrados
        })
        .catch((error) => {
          console.error('Error al pedir productos:', error);  // Muestra el error si hay problemas
        });
    }, [category, subcategory, textoBusqueda]);  // Vuelve a ejecutarse si cambia la categoría, subcategoría o el texto de búsqueda
  */

  return (
    <div className='grid-layout'>
      <div className='flex-container-category'>
        {/* Le pasamos category y subcategory para que el componente Category pueda saber cuál está activo */}
        <Category selectedCategory={category} selectedSubcategory={subcategory} />
      </div>
      <div className='flex-container'>
        {products.length > 0 ? (
          <ItemList products={products} />
        ) : (
          <div className="muy-pronto">
            <h3>¡MUY PRONTO <br />TENDREMOS MÁS!</h3>
            <img src={pronto} alt="pronto" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemListContainer;
