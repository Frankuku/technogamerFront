import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import Category from '../Categoryfilter/Category';
import ItemList from '../ItemList/ItemList';
import pronto from '../../../assets/img/iconos/pronto.png';
import API_URL from '../../../config/api';
import "./ItemListContainer.css";

function ItemListContainer() {
  const location = useLocation();
  const { category } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const textoBusqueda = searchParams.get('buscar')?.toLowerCase() || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data.categories); // 👈 acceder directamente al array
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const fetchProducts = async (pageNumber = 1, search = "", categoryParam = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const params = { page: pageNumber, limit: 50 };
      if (search.trim()) params.search = search;
      if (categoryParam) params.category = categoryParam;

      const res = await axios.get(`${API_URL}/products`, {
        params,
        headers: { Authorization: token }
      });

      setProducts(res.data.products);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar productos", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(1, textoBusqueda, category);
  }, [category, textoBusqueda]);

  return (
    <div className='grid-layout'>
      <div className='flex-container'>
        <Category
          selectedCategory={category}
          categories={categories}
        />
      </div>
      <div className='flex-container'>
        {loading ? (
          <p>Cargando...</p>
        ) : products.length > 0 ? (
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
