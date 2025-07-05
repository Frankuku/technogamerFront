import Entrega from "./Entrega/Entrega.jsx";
import Pago from "./Pago/Pago.jsx";
import "./Datos.css";
import Button from "../../../components/button/Button";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Datos() {
    const pagoRef = useRef();
    const entregaRef = useRef();
    const navigate = useNavigate();

    const handleConfirmar = () => {
        const pagoValido = pagoRef.current.validar();
        const entregaValida = entregaRef.current.validar();

        if (pagoValido && entregaValida) {
            const datosPago = pagoRef.current.getDatos();
            const datosEntrega = entregaRef.current.getDatos();

            navigate("/Resumen", {
                state: {
                    tipoPago: datosPago.tipoPago,
                    tipoEntrega: datosEntrega.tipoEntrega,
                    costoEnvio: datosEntrega.costoEnvio,
                    direccion: datosEntrega.direccion
                }
            });

        }
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
