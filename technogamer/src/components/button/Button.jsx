
import './Button.css';
function Button({ texto, onClick }) {
    return (
        <div className="my-4">
            <button onClick={onClick} className="btn carrito">{texto}</button>
        </div>
    );
}
export default Button