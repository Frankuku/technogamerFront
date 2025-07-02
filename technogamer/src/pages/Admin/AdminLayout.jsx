import AdminNavbar from "./AdminNavbar";
import { Container, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAtRoot = location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div>
      <AdminNavbar />
      <div className="p-4">
        {isAtRoot ? (
          <Container>
            <h2>Bienvenido al Panel de Administración</h2>
            <div className="d-flex gap-4 mt-4 flex-wrap justify-content-center">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>🛒 Productos</Card.Title>
                  <Card.Text>Gestión completa de productos: crear, editar y eliminar.</Card.Text>
                  <Button variant="secondary" onClick={() => navigate("/admin/products")}>
                    Ir a Productos
                  </Button>
                </Card.Body>
              </Card>

              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>📦 Control de Stock</Card.Title>
                  <Card.Text>Revisar y actualizar rápidamente el stock de productos.</Card.Text>
                  <Button variant="secondary" onClick={() => navigate("/admin/stock")}>
                    Ir a Stock
                  </Button>
                </Card.Body>
              </Card>

              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>📦📦 Control de Ordenes</Card.Title>
                  <Card.Text>Administrar ordenes registradas en el sistema.</Card.Text>
                  <Button variant="secondary" onClick={() => navigate("/admin/orders")}>
                    Ir a Ordenes
                  </Button>
                </Card.Body>
              </Card>

              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>👥 Usuarios</Card.Title>
                  <Card.Text>Administrar usuarios registrados en el sistema.</Card.Text>
                  <Button variant="secondary" onClick={() => navigate("/admin/users")}>
                    Ir a Usuarios
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Container>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default AdminLayout;

