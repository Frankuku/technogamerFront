import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Articulos from './Articulos/Articulos';
import ArticuloImgUno from '../../../assets/img/Articulos/Articulo_1.webp';
import ArticuloImgDos from '../../../assets/img/Articulos/Articulo_2.webp';
import ArticuloImgTres from '../../../assets/img/Articulos/Articulo_3.webp';
import './SectionG.css';

function SectionG() {
    const [key, setKey] = useState('ARTICULO DESTACADOS');

    const articulos = [
        {
            seccion: "ARTICULO DESTACADOS",
            articulo: [
                { img: ArticuloImgUno, titulo: "GPUs RTX series 5090, 5080 y 5070: Todo lo que necesitas saber" },
                { img: ArticuloImgDos, titulo: "RTX 5090 vs 5080: Diferencias explicadas" },
                { img: ArticuloImgTres, titulo: "Cómo habilitar XMP/EXPO en la BIOS" }
            ]
        },
        {
            seccion: "ARTICULO MÁS RECIENTES",
            articulo: [
                { img: ArticuloImgUno, titulo: "GPUs RTX series 5090, 5080 y 5070: Todo lo que necesitas saber" },
                { img: ArticuloImgDos, titulo: "RTX 5090 vs 5080: Diferencias explicadas" },
                { img: ArticuloImgTres, titulo: "Cómo habilitar XMP/EXPO en la BIOS" }
            ]
        }
    ];

    return (
        <>
            <h2>GUÍAS, CONSEJOS Y TRUCOS</h2>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="columnas articulos"
            >
                {articulos.map((articulo, index) => (
                    <Tab key={index} eventKey={articulo.seccion} title={articulo.seccion}>
                        <Articulos noticia={articulo.articulo} />
                    </Tab>
                ))}
            </Tabs>
        </>
    );
}

export default SectionG;
