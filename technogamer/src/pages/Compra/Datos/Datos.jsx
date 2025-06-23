import Entrega from "./Entrega/Entrega.jsx";
import Pago from "./Pago/Pago.jsx";
import "./Datos.css";
import Button from "../../../components/button/Button";
import { useRef } from "react";

function Datos() {
    const pagoRef = useRef();
    const entregaRef = useRef();

    const handleConfirmar = () => {
        const esPagoValido = pagoRef.current.validar();
        const esEntregaValido = entregaRef.current.validar();
    };

    return (
        <>
            <div className="datos">
                <Pago ref={pagoRef} />
                <Entrega ref={entregaRef} />
            </div>
            <Button texto="CONFIRMAR DATOS" type="button" onClick={handleConfirmar} />
        </>
    );
}

export default Datos;