
import { Link } from 'react-router-dom';
import './Category.css'; // asegurate de tener los estilos

function Category({ selectedCategory, categories = [] }) {
  return (
    <div>
      <h3 className='tituloCategoria'>Categorías</h3>
      <ul className='categoria'>
        <li>
          <Link
            to="/productos"
            className={!selectedCategory ? 'selected-category' : ''}
          >
            Todos los Productos
          </Link>
        </li>

        {categories.map((cat) => (
          <li key={cat._id}>
            <Link
              to={`/productos/${cat._id}`} // 👈 usás el ID, no el nombre
              className={selectedCategory === cat._id ? 'selected-category' : ''}
            >
              {cat.name}
            </Link>
          </li>
        ))}

      </ul>
    </div>
  );
}

export default Category;
