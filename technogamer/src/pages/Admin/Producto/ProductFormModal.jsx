import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import API_URL from "../../../config/api";

const ProductFormModal = ({ show, onHide, product, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
    isAvailable: true,
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data.categories);
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    if (!product && categories.length > 0 && form.category === "") {
      const categoriaGabinete = categories.find(
        (cat) => cat.name.toLowerCase() === "gabinete"
      );
      if (categoriaGabinete) {
        setForm((prevForm) => ({
          ...prevForm,
          category: categoriaGabinete._id,
        }));
      }
    }
  }, [categories, product, form.category]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        isAvailable: product.isAvailable,
        category: product.category?._id || "",
      });
      setPreview(product.image);
    } else {
      setForm({ name: "", description: "", stock: 0, price: 0, isAvailable: true, category: "" });
      setPreview("");
    }
    setFile(null);
  }, [product, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : preview);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      // 1) Crear o actualizar producto
      const url = product
        ? `${API_URL}/products/${product._id}`
        : `${API_URL}/products`;
      const method = product ? "put" : "post";
      const { data } = await axios[method](url, {
        ...form },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
      
      );
      const prodId = data.product?._id || data._id;

      // 2) Subir imagen si se seleccionó
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        await axios.post(
          `${API_URL}/products/${prodId}/upload`,
          formData,
          { headers: { Authorization: `${token}`,"Content-Type": "multipart/form-data" } }
        );
      }

      onSave();
      onHide();
    } catch (err) {
      console.error("Error guardando producto:", err.response || err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
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
            <Form.Control
              as="textarea"
              name="description"
              rows={2}
              value={form.description}
              onChange={handleChange}
            />
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
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{ width: "100px", marginTop: "8px" }}
              />
            )}
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
        <Button variant="secondary" onClick={onHide} disabled={saving}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={saving}>
          {saving ? <Spinner animation="border" size="sm" /> : "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;

