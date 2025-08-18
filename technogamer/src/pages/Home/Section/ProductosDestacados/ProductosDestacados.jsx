import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Teclado from './../../../../assets/img/Teclado.jpg'
import Mueble from './../../../../assets/img/Mueble.jpg'
import Gabinete from './../../../../assets/img/Gabinete.jpg'
import Grafica from './../../../../assets/img/Grafica.jpg'
import Refrigadores from './../../../../assets/img/Refrigadores.jpg'
import Producto from '../Productos/Producto/Producto.jsx'
import './ProductosDestacados.css'
import Destacado from './Destacado/Destacado.jsx';
// Y el resto de las importaciones...

function ProductosDestacados() {
    return (
        <Row>
            <Col xs={12} lg={6}>
                <Destacado direccion={'/producto/68a290b8d2867bad668a470f'} height={'300'}
                    img={'https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/Gaming-Keyboards/k70-core/Gallery/CH-910971E/CH-910971E_05.webp'}
                    nombre={' Logitech G915X Wireless tri-mode Low Profile '} />
                <Destacado direccion={'/producto/68a29e8485dcd3fdfb9cdfd1'} height={'370'}
                    img={'https://a.storyblok.com/f/281110/640x405/b278ac5fc8/gx-ii-gold-750-sec6-2.png/m/640x0/smart'}
                    nombre={' Master 1250W 80 Plus Gold Full '} />
            </Col>
            <Col xs={12} lg={6}>
                <Row>
                    <Col xs={12} lg={6} className='ps-0'>
                        <Destacado direccion={'/producto/68a2a03385dcd3fdfb9ce009'} height={'300'}
                            img={'https://m.media-amazon.com/images/S/aplus-media-library-service-media/73651ae8-8b74-450c-881e-d02b5e4da8c2.__CR0,0,600,450_PT0_SX600_V1___.jpg'}
                            nombre={'Razer Kraken V4 X RGB'} />
                    </Col>
                    <Col xs={12} lg={6} className='pe-0'>
                        <Destacado direccion={'/producto/68a2a23e85dcd3fdfb9ce0b2'} height={'300'}
                            img={'https://images.squarespace-cdn.com/content/v1/5f04f767ded4a14e876e6190/1729639021321-IL5Q7RTQ26T4N0C9DIOL/20241021_205652.jpg'}
                            nombre={'Redragon K686 Eisa PRO '} />
                    </Col>
                </Row>
                <Destacado direccion={'/producto/68a2a3d985dcd3fdfb9ce0c8'} height={'360'}
                    img={'https://tecnobytesec.com/wp-content/uploads/2024/08/headset-blackshark-v3-x-black.jpg'}
                    nombre={'Razer BLACKSHARK V2'} />
            </Col>
        </Row>
    );
}

export default ProductosDestacados;
