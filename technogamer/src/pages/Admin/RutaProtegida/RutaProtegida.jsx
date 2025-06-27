import { Navigate } from "react-router-dom";

function RutaProtegida({ children, rolRequerido }) {
    const isLogged = localStorage.getItem("logged") === "true";
    const rol = localStorage.getItem("rol");

    if (!isLogged || rol !== rolRequerido) {
        return <Navigate to="/Error" />;
    }

    return children;
}

export default RutaProtegida;