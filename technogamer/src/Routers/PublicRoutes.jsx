import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home.jsx';
import ItemListContainer from '../pages/CatalogoProducto/ItemListContainer/ItemListContainer.jsx';
import ItemDetailConteiner from '../pages/CatalogoProducto/ItemDetailConteiner/ItemDetailConteiner.jsx';
import ItemDetail from "../pages/CatalogoProducto/ItemDetail/ItemDetail.jsx";
import Compra from "../pages/Compra/Compra.jsx";
import Datos from "../pages/Compra/Datos/Datos.jsx";
import Resumen from "../pages/Compra/Datos/Resumen/Resumen.jsx";
import Error from '../pages/Error/Error.jsx';
import MisCompras from "../pages/MisCompras/MisCompras.jsx";
import MiCompra from "../pages/MisCompras/MiCompra/MiCompra.jsx";
import About from '../pages/About/About.jsx';

export default function PublicRoutes({ setModalType }) {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/producto/:id" element={<ItemDetail />} />
            <Route path="/productos/:category" element={<ItemListContainer />} />
            <Route path='/compra' element={<Compra setModalType={setModalType} />} />
            <Route path="/datos" element={<Datos />} />
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/miCompra/:orderId" element={<MiCompra />} />
            <Route path="/miscompras" element={<MisCompras />} />
            <Route path="/Error" element={<Error />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
}
