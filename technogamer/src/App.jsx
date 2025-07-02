import { useState } from "react";
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import { CartProvider } from './components/CarritoCompra/CarritoCompra.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { useLocation } from "react-router-dom";
import PublicRoutes from './Routers/PublicRoutes.jsx';
import AdminRoutes from './Routers/AdminRoutes.jsx';

function AppContent({ modalType, setModalType }) {
  const location = useLocation();

  // Detectar si la ruta actual es admin (ejemplo: empieza con "/admin")
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname === "/Admin";

  if (isAdminRoute) {
    // Solo mostrar rutas admin
    return <AdminRoutes />;
  }

  // Mostrar navbar, footer y rutas públicas
  return (
    <>
      <Navbar modalType={modalType} setModalType={setModalType} />
      <PublicRoutes setModalType={setModalType} />
      <Footer />
    </>
  );
}

function App() {
  const [modalType, setModalType] = useState(null);

  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent modalType={modalType} setModalType={setModalType} />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
