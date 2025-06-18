import React, { useState } from "react";

import isotipo from "../../assets/img/isotipo_technogamer.svg";
import lupa from "../../assets/img/iconos/buscador.png";
import Buscador from "../Buscardor/Buscardor";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Cart from "../Cart/Cart.jsx"
import './Navbar.css';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import CustomModal from "../Modal/CustomModal";
function Navbar() {
    const [modalType, setModalType] = useState(null);

    const handleClose = () => setModalType(null);

    return (
        <>
            <div className="navar-fixed">
                <nav className="login_register">
                    <div>
                        <button className=" iconos forlogin_forregister" onClick={() => setModalType('login')}>
                            <p>Iniciar sesión</p>
                        </button>
                    </div>
                    <div>
                        <button className=" iconos forlogin_forregister" onClick={() => setModalType('register')}>
                            <p>Registrarse</p>
                        </button>
                    </div>
                </nav>

                <BootstrapNavbar collapseOnSelect expand="lg" className="navabar">
                    <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BootstrapNavbar.Brand>
                        <Nav.Link href="/" className="logo">
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
                            <Nav.Link className="enlace" href="/productos">Productos</Nav.Link>
                            <Nav.Link className="enlace" href="/Error">Soporte</Nav.Link>
                            <Nav.Link className="enlace" href="/about">Nosotros</Nav.Link>
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
                    contenido={<Login abrirModalRegister={() => setModalType('register')} />}
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
