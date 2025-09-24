import React, { useState } from 'react';
import './ListMenu.css';

const ListMenu: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const gemas = [
    'Diamante',
    'Rubí',
    'Esmeralda',
    'Topacio',
    'Amatista',
    'Zafiro'
  ];

  const colors = [
    '#222222', // Rojo coral
    '#874561', // Turquesa
    '#222222', // Azul cielo
    '#874561', // Amarillo
    '#222222', // Púrpura
    '#874561'  // Rosa
  ];

  const getTopPosition = (index: number) => {
    const viewportHeight = window.innerHeight;
    const itemHeight = 150; // Altura de cada elemento
    const totalListHeight = gemas.length * itemHeight; // Altura total de la lista
    const baseTop = viewportHeight - totalListHeight; // Posición base desde la parte inferior, último elemento 50px más abajo
    const hoverSpacing = 30; // Variable hover-spacing

    // Si este elemento está siendo hovereado, no se mueve
    if (hoveredIndex === index) {
      return baseTop + (index * itemHeight);
    }

    // Si algún elemento anterior está siendo hovereado, se desplaza hacia abajo
    if (hoveredIndex !== null && index > hoveredIndex) {
      return baseTop + (index * itemHeight) + hoverSpacing;
    }

    return baseTop + (index * itemHeight);
  };

  const getItemStyle = (index: number) => ({
    backgroundColor: colors[index],
    top: `${getTopPosition(index)}px`,
    color: '#fff', // Color de texto blanco para todas las gemas
  });

  return (
    <div className="gem-list">
      {gemas.map((gema, index) => (
        <div
          key={index}
          className="gem-item"
          style={getItemStyle(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <span style={{marginTop: '-50px'}}>{gema}</span>
        </div>
      ))}
    </div>
  );
};

export default ListMenu;
