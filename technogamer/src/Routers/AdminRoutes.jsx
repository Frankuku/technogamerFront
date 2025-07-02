import { Routes, Route, useNavigate } from "react-router-dom";
import AdminLayout from "../pages/Admin/AdminLayout.jsx";
import AdminProductsPage from "../pages/Admin/Producto/AdminProductsPage.jsx";
import StockControlPage from "../pages/Admin/Producto/StockControlPage.jsx";
import AdminUsersPage from "../pages/Admin/Usuario/AdminUsersPage.jsx";
import "./AdminRoutes.css"
import RutaProtegida from "../pages/Admin/RutaProtegida/RutaProtegida.jsx"
import AdminOrdersPage from "../pages/Admin/Order/AdminOrdersPage.jsx";
import OrderDetailPage from "../pages/Admin/Order/OrderDetailPage.jsx";

export default function AdminRoutes() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("logged");
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.removeItem("user");
        navigate("/"); // Llevar al home o login al cerrar sesión
        window.location.reload();
    };

    return (
        <>
            {/* Podrías mover este botón dentro del AdminLayout para que esté siempre visible en admin */}
            <button className="logout-button" onClick={handleLogout}>
                Cerrar sesión
            </button>

            <Routes>
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

        //Aqui comienza la ruta de ordenes
                <Route path="/admin/orders"
                    element={
                        <AdminLayout>
                            <AdminOrdersPage />
                        </AdminLayout>
                    }
                />

        //Aqui comienza la ruta de usuarios
                <Route path="/admin/orders/:id"
                    element={
                        <AdminLayout>
                            <OrderDetailPage />
                        </AdminLayout>
                    }
                />                                
            </Routes>
        </>
    );
}
