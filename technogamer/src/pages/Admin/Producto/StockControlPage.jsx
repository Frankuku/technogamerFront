import { useEffect, useState } from "react";
import { Table, Button, Form, Container, Spinner, Pagination, Row, Col } from "react-bootstrap";
import axios from "axios";
import dayjs from "dayjs";
import ToastMessage from "../../../components/ToastMessage";
import API_URL from "../../../config/api";


const StockControlPage = () => {
  const [products, setProducts] = useState([]);
  const [editingStock, setEditingStock] = useState({});
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  const [toast, setToast] = useState({ show: false, message: "", bg: "success" });

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
  };

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (searchTerm.trim()) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;

      const res = await axios.get(`${API_URL}/products`, { params });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      showToast("Error al cargar productos", "danger");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm, selectedCategory]);

  const handleChangeStock = (productId, value) => {
    const number = parseInt(value);
    if (number < 0) return; // prevenir entrada negativa

    setEditingStock((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleSaveStock = async (productId, currentStock) => {
    const rawValue = editingStock[productId];
    const newStock = parseInt(rawValue);

    if (isNaN(newStock) || newStock < 0) {
      showToast("Por favor, ingrese un valor de stock válido y positivo", "danger");
      return;
    }

    if (newStock === currentStock) {
      showToast("No hay cambios en el stock", "warning");
      return;
    }

    const confirm = window.confirm("¿Estás seguro de actualizar el stock?");
    if (!confirm) return;

    try {
      await axios.patch(
        `${API_URL}/products/${productId}`,
        { stock: newStock },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setEditingStock((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
      fetchProducts();
      showToast("Stock actualizado correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar stock:", error);
      showToast("Error al actualizar el stock", "danger");
    }
  };

  const handlePageChange = (num) => {
    if (num >= 1 && num <= totalPages) {
      setPage(num);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Control de Stock</h2>

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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Categoría --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
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
                <th>Stock</th>
                <th>Última Modificación</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => {
                const editedValue = editingStock[prod._id];
                const isModified = editedValue !== undefined && parseInt(editedValue) !== prod.stock;

                return (
                  <tr key={prod._id}>
                    <td>{prod.name}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        value={editedValue ?? prod.stock}
                        onChange={(e) => handleChangeStock(prod._id, e.target.value)}
                        style={{ width: "80px" }}
                      />
                    </td>
                    <td>{dayjs(prod.updatedAt).format("DD/MM/YYYY HH:mm")}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="success"
                        disabled={!isModified}
                        onClick={() => handleSaveStock(prod._id, prod.stock)}
                      >
                        Guardar
                      </Button>
                    </td>
                  </tr>
                );
              })}
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

      <ToastMessage
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </Container>
  );
};

export default StockControlPage;
