import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/admin">Panel Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar" />
        <Navbar.Collapse id="admin-navbar">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/admin/products">
              🛒 Productos
            </NavLink>
            <NavLink className="nav-link" to="/admin/stock">
              📦 Control de Stock
            </NavLink>
            <NavLink className="nav-link" to="/admin/orders">
              📦📦 Control de Ordenes
            </NavLink>
            <NavLink className="nav-link" to="/admin/users">
              👥 Usuarios
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
