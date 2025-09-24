import React, { useState } from "react";
import bgImage from "./background.webp";
import "./ListBackground.css";

const names = [
  "Inicio de todo",
  "Paseo sobre el agua",
  "Consejo de ancianos",
  "Espada de la vida",
  "Peliculas del pasado",
  "Politica y poder",
  "Te encontrare",
  "Mañana sera otro dia",
  "Sin sentido, sin razón",
  "Venganza",
  "Amigos, familia y amor",
  "Final de nada",
];

const ListBackground: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Tamaño de la imagen
  const imageWidth = 688;
  const imageHeight = 1024;
  const itemHeight = 79; // px

  return (
    <div className="list-bg-outer">
      <div
        className="list-bg-container"
        style={{ width: imageWidth, height: imageHeight }}
      >
        {/* Fondo difuminado */}
        <div
          className="list-bg-blur"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: `${imageWidth}px ${imageHeight}px`,
          }}
        />
        {/* Título */}
        <div
          className="list-bg-title"
          style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}
        >
          La Espada de la Venganza
        </div>
        {/* Lista de nombres */}
        <div className="list-bg-list">
          {names.map((name, idx) => {
            // Calcula la posición vertical real del fondo para cada item
            // El primer item está justo debajo del título, el último al final de la imagen
            const y = itemHeight * (idx + 1);
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={name}
                className={`list-bg-item${isHovered ? " hovered" : ""}`}
                style={
                  isHovered
                    ? {
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: `${imageWidth}px ${imageHeight}px`,
                        backgroundPosition: `0px -${y}px`,
                        color: "white",
                      }
                    : {
                        background: "transparent",
                        color: "black",
                      }
                }
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className="list-bg-name">{name}</span>
                <span className="list-bg-number">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListBackground;