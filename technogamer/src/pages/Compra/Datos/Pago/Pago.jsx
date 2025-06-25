import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button from '../../../../components/button/Button';
import './Pago.css';

const Pago = forwardRef((props, ref) => {
    const [metodo, setMetodo] = useState('');
    const [campos, setCampos] = useState({
        nombre: '',
        tarjeta: '',
        dni: '',
        vencimiento: '',
        cvv: ''
    });

    const [errores, setErrores] = useState({});

    useImperativeHandle(ref, () => ({
        validar: () => {
            const nuevosErrores = {};

            if (!metodo) {
                nuevosErrores.metodo = "Seleccioná un método de pago.";
            }

            if (metodo === 'tarjeta') {
                if (!campos.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
                if (!/^\d{12}$/.test(campos.tarjeta)) nuevosErrores.tarjeta = "Debe tener 12 dígitos.";
                if (!/^\d{1,10}$/.test(campos.dni)) nuevosErrores.dni = "DNI no es valido (al menos debe tener 10 digitos).";
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(campos.vencimiento)) nuevosErrores.vencimiento = "Formato inválido. Ej: 05/27";
                if (!/^\d{3}$/.test(campos.cvv)) nuevosErrores.cvv = "Debe tener 3 dígitos.";
            }

            setErrores(nuevosErrores);
            return Object.keys(nuevosErrores).length === 0;
        },
        getDatos: () => {
            return {
                tipoPago: metodo || null
            };
        }
    }));

    const handleChange = (campo, valor) => {
        setCampos((prev) => ({
            ...prev,
            [campo]: valor
        }));
    };

    return (
        <div className="contenedor-pago">
            <h2 className="titulo-pago">Método de pago</h2>

            <div className="botones-pago">
                <Button
                    className={metodo === 'transferencia' ? 'btn-seleccionado' : 'btn-opcion'}
                    onClick={() => setMetodo('transferencia')}
                    texto="Transferencia"
                />
                <Button
                    className={metodo === 'tarjeta' ? 'btn-seleccionado' : 'btn-opcion'}
                    onClick={() => setMetodo('tarjeta')}
                    texto="Tarjeta Débito/Crédito"
                />
            </div>
            {errores.metodo && <p className="error">{errores.metodo}</p>}

            {metodo === 'transferencia' && (
                <div className="notificacion-transferencia">
                    <strong>¡Recordá!</strong> Mandar el comprobante por WhatsApp o correo electrónico.
                </div>
            )}

            {metodo === 'tarjeta' && (
                <form className="formulario-tarjeta">
                    <input
                        type="text"
                        placeholder="Nombre en la tarjeta"
                        value={campos.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                    />
                    {errores.nombre && <p className="error">{errores.nombre}</p>}

                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Número de tarjeta"
                        value={campos.tarjeta}
                        maxLength="12"
                        onChange={(e) => handleChange("tarjeta", e.target.value.replace(/\D/g, ""))}
                    />
                    {errores.tarjeta && <p className="error">{errores.tarjeta}</p>}

                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="DNI"
                        value={campos.dni}
                        maxLength="10"
                        onChange={(e) => handleChange("dni", e.target.value.replace(/\D/g, ""))}
                    />
                    {errores.dni && <p className="error">{errores.dni}</p>}

                    <div className="tarjeta-row">
                        <input
                            type="text"
                            placeholder="MM/AA"
                            value={campos.vencimiento}
                            onChange={(e) => handleChange("vencimiento", e.target.value)}
                        />
                        {errores.vencimiento && <p className="error">{errores.vencimiento}</p>}
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="CVV"
                            value={campos.cvv}
                            maxLength="3"
                            onChange={(e) => handleChange("cvv", e.target.value.replace(/\D/g, ""))}
                        />
                        {errores.cvv && <p className="error">{errores.cvv}</p>}
                    </div>
                </form>
            )}
        </div>
    );
});

export default Pago;
