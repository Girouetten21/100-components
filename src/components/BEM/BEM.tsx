import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../css/Cursor.scss";

interface CursorProps {}

const BEM: React.FC<CursorProps> = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animación inicial
    gsap.from(boxRef.current, {
      duration: 1,
      opacity: 0,
      y: 100,
      ease: "power3.out",
    });

    gsap.from(titleRef.current, {
      duration: 1,
      opacity: 0,
      x: -100,
      delay: 0.5,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div className="container">
      <div className="col-wrapper">
        <div className="col-2">
          <div className="col-2__content col-2__content--left">
            <img
              src="https://via.placeholder.com/500"
              alt="Ejemplo"
              style={{ width: "500px", height: "500px" }}
            />
            <p className="mt-1">
              Descripción de la imagen alineada a la izquierda
            </p>
          </div>
        </div>
        <div className="col-2">
          <div className="col-2__content col-2__content--center">
            <h3>Título Centrado</h3>
            <p>
              Este es un párrafo de ejemplo que está centrado en la columna.
              Puede contener mucho texto y se mantendrá alineado al centro.
            </p>
            <button className="mt-2">Botón de Ejemplo</button>
          </div>
        </div>
      </div>

      {/* Columnas de 50% */}
      <div className="col-wrapper">
        <div className="col-3">
          <div className="col-3__content col-3__content--left col-3__content--top">
            <h4>Alineado Izquierda-Arriba</h4>
            <p>Contenido alineado a la izquierda y arriba</p>
          </div>
        </div>
        <div className="col-3">
          <div className="col-3__content col-3__content--center col-3__content--middle">
            <h4>Centrado-Medio</h4>
            <p>Contenido centrado vertical y horizontalmente</p>
          </div>
        </div>
        <div className="col-3">
          <div className="col-3__content col-3__content--right col-3__content--bottom">
            <h4>Alineado Derecha-Abajo</h4>
            <p>Contenido alineado a la derecha y abajo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BEM;
