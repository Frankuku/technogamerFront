import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import ItemListContainer from './pages/CatalogoProducto/ItemListContainer/ItemListContainer.jsx'
import ItemDetailConteiner from './pages/CatalogoProducto/ItemDetailConteiner/ItemDetailConteiner.jsx'
import Error from './pages/Error/Error.jsx'
import About from './pages/About/About.jsx'
import { CartProvider } from './components/CarritoCompra/CarritoCompra.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetailConteiner />} />
          <Route path="/productos/:category" element={<ItemListContainer />} />
          <Route path="/productos/:category/:subcategory" element={<ItemListContainer />} />
          <Route path="/Error" element={<Error />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
