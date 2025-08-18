import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Producto from './Producto/Producto'; // Asumiendo que Producto.js está en el mismo nivel
import Teclado from './../../../../assets/img/Teclado.webp'
import Sdd from './../../../../assets/img/Sdd.webp'
import Procesador from './../../../../assets/img/Procesador.webp'
import Auriculares from './../../../../assets/img/Auriculares.webp'
import Monitores from './../../../../assets/img/Monitores.webp'
import Mueble from './../../../../assets/img/Mueble.webp'
import Gabinete from './../../../../assets/img/Gabinete.webp'
import Grafica from './../../../../assets/img/Grafica.webp'
import Refrigadores from './../../../../assets/img/Refrigadores.webp'
import './Productos.css'
// Y el resto de las importaciones...

function Productos() {
    return (
        <Row>
            <Col xs={12} lg={6}>
                <Producto imagen={Teclado} altText="Teclado" title="Teclados" link="/productos/68a29aa4d2867bad668a4807" />
                <Row>
                    <Col xs={12} lg={6} className='ps-0'>
                        <Producto imagen={Auriculares} altText="Auriculares" title="Auriculares" link="/productos/68630b9c33269bded63d4139" />
                    </Col>
                    <Col xs={12} lg={6} className='pe-0'>
                        <Producto imagen={Monitores} altText="Monitores" title="Monitores" link="/productos/685f3132e967a7821530a04b" />
                    </Col>
                </Row>
                <Producto imagen={Gabinete} altText="Gabinete" title="Gabinetes Gamer" link="/productos/68630c3d33269bded63d4147" />
            </Col>
            <Col xs={12} lg={6}>
                <Row>
                    <Col xs={12} lg={6} className='ps-0'>
                        <Producto imagen={Sdd} altText="Sdd" title="Sdd" link="/productos/6863115433269bded63d41a4" />
                    </Col>
                    <Col xs={12} lg={6} className='pe-0'>
                        <Producto imagen={Procesador} altText="Procesadores" title="Procesadores" link="/productos/68630af333269bded63d4128" />
                    </Col>
                </Row>
                <Producto imagen={Mueble} altText="Mueble" title="Sillas" link="/productos/68630b3033269bded63d412b" />
                <Row>
                    <Col xs={12} lg={6} className='ps-0'>
                        <Producto imagen={Grafica} altText="Grafica" title="Tarjeta Gráfica" link="/productos/68630ab233269bded63d4125" />
                    </Col>
                    <Col xs={12} lg={6} className='pe-0'>
                        <Producto imagen={Refrigadores} altText="Refrigadores" title="Refrigeración" link="/productos/68a2a51785dcd3fdfb9ce0ee" />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Productos;
