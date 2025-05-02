import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CubeTween = () => {
  const cubeRef = useRef(null);

  useEffect(() => {
    // Tween para mover el cubo de un punto A a un punto B
    gsap.to(cubeRef.current, {
      x: 300, // Movimiento en el eje X
      duration: 5, // Duración de la animación
      ease: "power2.out", // Easing de la animación
    });
  }, []);

  return (
    <div
      ref={cubeRef}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
        position: "absolute", // Para poder moverlo
        top: "50%", // Centrado verticalmente
        left: "0%", // Comienza en el lado izquierdo
        transform: "translateY(-50%)", // Ajuste para centrar
      }}
    />
  );
};

export default CubeTween;
