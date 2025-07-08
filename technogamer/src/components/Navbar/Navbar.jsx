import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 agregado useNavigate
import isotipo from "../../assets/img/isotipo_technogamer.svg";
import lupa from "../../assets/img/iconos/buscador.png";
import Buscador from "../Buscardor/Buscardor";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Cart from "../Cart/Cart.jsx";
import './Navbar.css';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import CustomModal from "../Modal/CustomModal";

function Navbar({ modalType, setModalType }) {
    const [lastOrderId, setLastOrderId] = useState(null);
    const navigate = useNavigate(); // 👈 hook de navegación

    useEffect(() => {
        const storedOrderId = localStorage.getItem("lastOrderId");
        if (storedOrderId) setLastOrderId(storedOrderId);
    }, []);

    const handleClose = () => setModalType(null);

    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch (e) {
            return null;
        }
    })();

    const isLogged = localStorage.getItem("logged") === "true";

    const handleLogout = () => {
        localStorage.removeItem("logged");
        localStorage.removeItem("user");
        localStorage.removeItem("rol");
        // Agrega más claves si es necesario limpiar más info
        navigate("/"); // 👈 redirige al home
    };

    return (
        <>
            <div className="navar-fixed">
                <nav className="login_register">
                    {isLogged ? (
                        <>
                            <p className="iconos fs-5 d-block align-self-center">
    Hola, {localStorage.getItem("rol") === "admin" ? "Admin" : user?.username || "Usuario"}!
</p>
                            <button className="iconos forlogin_forregister" onClick={handleLogout}>
                                <p>Cerrar sesión</p>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="iconos forlogin_forregister" onClick={() => setModalType('login')}>
                                <p>Iniciar sesión</p>
                            </button>
                            <button className="iconos forlogin_forregister" onClick={() => setModalType('register')}>
                                <p>Registrarse</p>
                            </button>
                        </>
                    )}
                </nav>

                <BootstrapNavbar collapseOnSelect expand="lg" className="navabar">
                    <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BootstrapNavbar.Brand>
                        <Nav.Link as={Link} to="/" className="logo">
                            <img src={isotipo} alt="isotipo" />
                            <p>Technogamer</p>
                        </Nav.Link>
                        <div className="visible-mobil">
                            <div className="iconos">
                                <button className="border-0 iconos" onClick={() => setModalType('buscador')}>
                                    <img src={lupa} alt="lupa_buscador" />
                                </button>
                            </div>
                            <Cart />
                        </div>
                    </BootstrapNavbar.Brand>

                    <BootstrapNavbar.Collapse className="navbar_enalace_iconos" id="responsive-navbar-nav">
                        <Nav className="enlaces">
                            <Nav.Link as={Link} className="enlace" to="/productos">Productos</Nav.Link>
                            <Nav.Link as={Link} className="enlace" to="/Error">Soporte</Nav.Link>
                            <Nav.Link as={Link} className="enlace" to="/about">Nosotros</Nav.Link>
                            {isLogged && (
                                <Nav.Link as={Link} className="enlace" to="/miscompras">
                                    Mis Compras
                                </Nav.Link>
                            )}
                        </Nav>
                        <Nav className="align-items-center visible-pc">
                            <div className="iconos">
                                <button className="border-0 iconos" onClick={() => setModalType('buscador')}>
                                    <img src={lupa} alt="lupa_buscador" />
                                </button>
                            </div>
                            <Cart />
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </BootstrapNavbar>

                {/* Modales */}
                <CustomModal
                    visible={modalType === 'register'}
                    onHide={handleClose}
                    contenido={<Register abrirModalLogin={() => setModalType('login')} />}
                    cruz={true}
                />

                <CustomModal
                    visible={modalType === 'login'}
                    onHide={handleClose}
                    contenido={<Login abrirModalRegister={() => setModalType('register')} onLoginSuccess={handleClose} />}
                    cruz={true}
                />

                <CustomModal
                    visible={modalType === 'buscador'}
                    onHide={handleClose}
                    contenido={<Buscador />}
                    cruz={false}
                />
            </div>

            <div className="navbar-realative"></div>
        </>
    );
}

export default Navbar;
