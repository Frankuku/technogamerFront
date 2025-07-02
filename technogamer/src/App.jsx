import { useState } from "react";
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import ItemListContainer from './pages/CatalogoProducto/ItemListContainer/ItemListContainer.jsx'
import ItemDetailConteiner from './pages/CatalogoProducto/ItemDetailConteiner/ItemDetailConteiner.jsx'
import Compra from "./pages/Compra/Compra.jsx";
import Datos from "./pages/Compra/Datos/Datos.jsx";
import Resumen from "./pages/Compra/Datos/Resumen/Resumen.jsx"
import Error from './pages/Error/Error.jsx'
import About from './pages/About/About.jsx'
import AdminLayout from "./pages/Admin/AdminLayout.jsx"
import AdminProductsPage from "./pages/Admin/Producto/AdminProductsPage.jsx";
import StockControlPage from "./pages/Admin/Producto/StockControlPage.jsx"
import AdminOrdersPage from "./pages/Admin/Order/AdminOrdersPage.jsx";
import OrderDetailPage from "./pages/Admin/Order/OrderDetailPage.jsx";
import RutaProtegida from "./pages/Admin/RutaProtegida/RutaProtegida.jsx";
import AdminUsersPage from "./pages/Admin/Usuario/AdminUsersPage.jsx";
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

        <Navbar modalType={modalType} setModalType={setModalType} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetailConteiner />} />
          <Route path="/productos/:category" element={<ItemListContainer />} />
          <Route path="/productos/:category/:subcategory" element={<ItemListContainer />} />
          <Route path='/compra' element={<Compra setModalType={setModalType} />} />
          <Route path="/datos" element={<Datos />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/Error" element={<Error />} />
          <Route path="/about" element={<About />} />

          //Aqui empiezan las rutas de la seccion de administracion
          <Route path="/Admin" element={
            //<RutaProtegida rolRequerido="admin">          
              <AdminLayout />
          //  </RutaProtegida>
          } />

          <Route path="/admin/products"
                element={
                  <AdminLayout>
                   <AdminProductsPage />
                  </AdminLayout>
                }
         />

          <Route path="/admin/stock"
                element={
                  <AdminLayout>
                   <StockControlPage />
                  </AdminLayout>
                }
         />

         //Aqui comienza la ruta de usuarios
          <Route path="/admin/users"
                element={
                  <AdminLayout>
                   <AdminUsersPage />
                  </AdminLayout>
                }
          />
          //Rutas para ordenes
          <Route path="/admin/orders"
                  element={
                    <AdminLayout>
                      <AdminOrdersPage />
                    </AdminLayout>
                  }
          />
          <Route path="/admin/orders/:id"
                  element={
                    <AdminLayout>
                      <OrderDetailPage />
                    </AdminLayout>
                  }
          />
        </Routes>
        <Footer />
        <AppContent modalType={modalType} setModalType={setModalType} />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
