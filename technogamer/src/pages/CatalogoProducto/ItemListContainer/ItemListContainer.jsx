import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import Category from '../Categoryfilter/Category';
import ItemList from '../ItemList/ItemList';
import pronto from '../../../assets/img/iconos/pronto.png';
import API_URL from '../../../config/api';
import { Pagination } from "react-bootstrap";
import "./ItemListContainer.css";

function ItemListContainer() {
  const location = useLocation();
  const { category } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const textoBusqueda = searchParams.get('buscar')?.toLowerCase() || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 👈 Estado para la página actual
  const [totalPages, setTotalPages] = useState(1); // 👈 Total de páginas

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const fetchProducts = async (pageNumber = 1, search = "", categoryParam = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const params = { page: pageNumber, limit: 10 }; // 👈 limit: 10 por página

      if (search.trim()) params.search = search;
      if (categoryParam) params.category = categoryParam;

      const res = await axios.get(`${API_URL}/products`, {
        params,
        headers: { Authorization: token }
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages || 1); // 👈 asegurate que tu backend mande esto
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar productos", err);
      setLoading(false);
    }
  };

  // 👉 Cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Cargar categorías una vez
  useEffect(() => {
    fetchCategories();
  }, []);

  // Cargar productos cuando cambian filtros o página
  useEffect(() => {
    fetchProducts(page, textoBusqueda, category);
  }, [category, textoBusqueda, page]);

  return (
    <>
      <div className='grid-layout'>
        <div className='flex-container'>
          <Category selectedCategory={category} categories={categories} />
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
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Pagination.Item
            key={num}
            active={num === page}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
      </Pagination>
    </>
  );
}

export default ItemListContainer;
