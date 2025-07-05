import "./Entrega.css";
import React, { useState, forwardRef, useImperativeHandle } from "react";

const Entrega = forwardRef((props, ref) => {
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [tipoEnvio, setTipoEnvio] = useState("");

    const [errores, setErrores] = useState({});

    useImperativeHandle(ref, () => ({
        validar: () => {
            const nuevosErrores = {};

            if (!calle.trim()) nuevosErrores.calle = "La calle es obligatoria.";
            if (!numero.trim()) nuevosErrores.numero = "El número es obligatorio.";
            if (!ciudad.trim()) nuevosErrores.ciudad = "La ciudad es obligatoria.";
            if (!codigoPostal || codigoPostal.length !== 4)
                nuevosErrores.codigoPostal = "Debe tener 4 dígitos.";
            if (!tipoEnvio) nuevosErrores.tipoEnvio = "Seleccioná un tipo de envío.";

            setErrores(nuevosErrores);

            return Object.keys(nuevosErrores).length === 0;
        },
        getDatos: () => {
            let costo = 0;
            if (tipoEnvio === "domicilio") costo = 20000;
            else if (tipoEnvio === "sucursal") costo = 15000;
            else if (tipoEnvio === "retiro") costo = 0;

            return {
                tipoEntrega: tipoEnvio || null,
                costoEnvio: costo,
                direccion: {
                    street: `${calle} ${numero}`,
                    city: ciudad,
                    postalCode: codigoPostal,
                    country: "Argentina"
                }
            };
        }
    }));

    return (
        <div className="datos-dark-container">
            <h2 className="titulo-entrega">Datos de Entrega</h2>
            <form className="formulario-entrega">
                <input
                    type="text"
                    placeholder="Nombre de la calle"
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                />
                {errores.calle && <p className="error">{errores.calle}</p>}

                <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))}
                />
                {errores.numero && <p className="error">{errores.numero}</p>}

                <input
                    type="text"
                    placeholder="Ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                />
                {errores.ciudad && <p className="error">{errores.ciudad}</p>}

                <input
                    type="text"
                    placeholder="Código postal (4 dígitos)"
                    value={codigoPostal}
                    onChange={(e) => {
                        const valor = e.target.value;
                        if (/^\d{0,4}$/.test(valor)) {
                            setCodigoPostal(valor);
                        }
                    }}
                />
                {errores.codigoPostal && <p className="error">{errores.codigoPostal}</p>}

                <div className="envio-opciones">
                    <label>
                        <input
                            type="radio"
                            name="envio"
                            value="domicilio"
                            checked={tipoEnvio === "domicilio"}
                            onChange={(e) => setTipoEnvio(e.target.value)}
                        />
                        A domicilio
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="envio"
                            value="sucursal"
                            checked={tipoEnvio === "sucursal"}
                            onChange={(e) => setTipoEnvio(e.target.value)}
                        />
                        A sucursal OCA
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="envio"
                            value="retiro"
                            checked={tipoEnvio === "retiro"}
                            onChange={(e) => setTipoEnvio(e.target.value)}
                        />
                        Retiro en tienda
                    </label>
                </div>
                {errores.tipoEnvio && <p className="error">{errores.tipoEnvio}</p>}

                {tipoEnvio === "domicilio" && (
                    <div className="envio-info">
                        <p className="precio-envio">$20.000</p>
                        <p className="detalle-envio">Llega en 4 días una vez despachado</p>
                    </div>
                )}
                {tipoEnvio === "sucursal" && (
                    <div className="envio-info">
                        <p className="precio-envio">$15.000</p>
                        <p className="detalle-envio">Llega en 2 días una vez despachado</p>
                    </div>
                )}
                {tipoEnvio === "retiro" && (
                    <div className="envio-info">
                        <p className="precio-envio">$0</p>
                        <p className="detalle-envio">
                            Estará listo después de 24 hs. Se notificará por Gmail
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
});

export default Entrega;
