import React from 'react';
import { Link } from "react-router-dom";
import './About.css';
import iconoEquipo from '../../assets/img/icono_equipo.jpg';


const equipo = [
  { nombre: "Franco Gerez", imagen: iconoEquipo },
  { nombre: "Claudio Javier Gonzalez", imagen: iconoEquipo },
];

function About() {
  return (
    <div className="about2-container">

      <section className="about2-frase">
        <h1>"Innovamos el futuro del gaming"</h1>
      </section>


      <section className="about2-equipo">
        <h2>Conocé a nuestro equipo</h2>
        <div className="about2-cards-container">
          {equipo.map((persona, index) => (
            <div key={index} className="about2-card">
              <img src={persona.imagen} alt={persona.nombre} />
              <h3>{persona.nombre}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Historia y origenes */}
      <section className="about2-historia">
        <h2>Nuestro camino</h2>
        <div className="about2-timeline">
          <div className="about2-timeline-item">
            <span className="about2-timeline-year">2024</span>
            <div className="about2-timeline-content">
              <p>Nace TECHNOGAMER2 con un pequeño equipo en Tucumán.</p>
            </div>
          </div>
          <div className="about2-timeline-item">
            <span className="about2-timeline-year">2025</span>
            <div className="about2-timeline-content">
              <p>Lanzamos nuestra primera línea de hardware gamer.</p>
            </div>
          </div>
          <div className="about2-timeline-item">
            <span className="about2-timeline-year ultimo-año">2026</span>
            <div className="about2-timeline-content">
              <p>Expansión regional y comunidad de 10.000 miembros.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Negocio */}
      <section className="about2-negocio">
        <h2>Sobre TECHNOGAMER2</h2>
        <p>
          Nacimos en 2025 con una misión clara: redefinir la experiencia gamer en Argentina . Empezamos siendo un pequeño grupo de apasionados por la tecnología y los videojuegos, y hoy somos una comunidad en crecimiento.
        </p>
        <p>
          Nuestra sede está en Tucumán, Argentina. Seguimos impulsando la innovación, buscando ser referentes en hardware y gaming experience.
        </p>
        <Link to="/Error">
          <button className="about2-btn">Saber más</button>
        </Link>
      </section>
    </div>
  );
}

export default About;
