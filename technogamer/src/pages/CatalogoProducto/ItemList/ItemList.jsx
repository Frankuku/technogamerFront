import Item from "../Item/Item";
import { Row } from "react-bootstrap";

function ItemList({ products }) {
    return (
        <Row className="gap-1">
            {
                products.length > 0 &&
                products.map((product) => { // <-- ¡Cambio aquí! 'products' (plural) a 'product' (singular)
                    return (
                        // Asumiendo que tus objetos de producto del backend tienen una propiedad '_id' única.
                        <Item key={product._id} producto={product} /> // <-- ¡Y cambio aquí! de 'products.id' a 'product._id'
                    )
                })
            }
        </Row>
    )
}
export default ItemList;