import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const ProductFormModal = ({ show, onHide, product, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
    isAvailable: true,
    category: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:4000/api/categories");
      setCategories(res.data.categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        category: product.category?._id || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        stock: 0,
        price: 0,
        isAvailable: true,
        category: "",
        image: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    const url = product
      ? `http://localhost:4000/api/products/${product._id}`
      : "http://localhost:4000/api/products";
    const method = product ? "put" : "post";
    await axios[method](url, form);
    onSave();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" name="description" rows={2} value={form.description} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name="price" value={form.price} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={form.stock} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="category" value={form.category} onChange={handleChange}>
              <option value="">-- Seleccionar --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control name="image" value={form.image} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Disponible"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;

