import { useEffect, useState, useRef } from "react";
import {
  Table,
  Button,
  Container,
  Spinner,
  Pagination,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import ProductFormModal from "./ProductFormModal";
import ToastMessage from "../../../components/ToastMessage";
import API_URL from "../../../config/api";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "", bg: "success" });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const debounceTimeout = useRef(null);

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error al cargar categorías", err);
      showToast("Error al cargar categorías", "danger");
    }
  };

  const fetchProducts = async (pageNumber = 1, search = searchTerm, category = categoryFilter) => {
    try {
      setLoading(true);
      const params = {
        page: pageNumber,
        limit: 5,
      };
      if (search.trim()) params.search = search;
      if (category) params.category = category;

      const res = await axios.get(`${API_URL}/products`, { params });

      setProducts(res.data.products);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar productos", err);
      showToast("Error al cargar productos", "danger");
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        showToast("Producto eliminado", "danger");
        fetchProducts(page);
      } catch (err) {
        console.error("Error al eliminar", err);
        showToast("Error al eliminar producto", "danger");
      }
    }
  };

  const handleNew = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleSave = () => {
    fetchProducts(page);
    showToast("Producto guardado con éxito", "success");
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      fetchProducts(pageNumber);
    }
  };

  // Cuando cambie searchTerm o categoryFilter, reinicia la página y ejecuta fetch con debounce
  useEffect(() => {
    // limpia timeout anterior si hay
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetchProducts(1, searchTerm, categoryFilter);
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm, categoryFilter]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Administrar Productos</h2>

      <Row className="align-items-center mb-3" style={{ gap: "8px" }}>
        <Col xs="auto" style={{ minWidth: "180px" }}>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Buscar nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col xs="auto" style={{ minWidth: "150px" }}>
          <Form.Select
            size="sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">-- Categoría --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs="auto" className="ms-auto">
          <Button size="sm" onClick={handleNew}>
            + Nuevo Producto
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                products.map((prod) => (
                  <tr key={prod._id}>
                    <td>{prod.name}</td>
                    <td>{prod.description}</td>
                    <td>${prod.price}</td>
                    <td>{prod.stock}</td>
                    <td>{prod.isAvailable ? "Sí" : "No"}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => handleEdit(prod)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(prod._id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </Table>

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
      )}

      <ProductFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={selectedProduct}
        onSave={handleSave}
      />

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </Container>
  );
};

export default AdminProductsPage;
