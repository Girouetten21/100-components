import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelTransition from "./PixelTransition";
import "./HorizontalScrollSection.css";
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
import img5 from './img/5.jpg';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const images = [img1, img2, img3, img4, img5];

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 20",
        end: "+=5000",
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(Math.floor(progress * images.length), images.length - 1);
          setCurrentIndex(index);
        }
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  const images = [img1, img2, img3, img4, img5];

  return (
    <>
      {/* Primera sección: texto centrado */}
      <div className="section-wrapper">
        <section className="hero-section">
          <h1>Bienvenido a la Sección</h1>
        </section>
      </div>

      {/* Sección del medio: cambio de color con caja fija */}
      <div className="section-wrapper" ref={wrapperRef}>
        <section className="scroll-section" style={{ position: 'relative' }}>
          <PixelTransition images={images} currentIndex={currentIndex} />
          <div className="fixed-box" style={{ position: 'relative', zIndex: 10 }}>
            <h3>Sección Importante</h3>
            <h2>Título del Cuadro</h2>
            <p>
              Este es el texto descriptivo del cuadro en la sección del medio. Aquí puedes colocar cualquier contenido relevante para tu proyecto. El fondo de la sección cambiará de color mientras haces scroll: azul por defecto, luego rojo, verde, naranja y negro.
            </p>
          </div>
        </section>
      </div>

      {/* Última sección: texto centrado */}
      <div className="section-wrapper">
        <section className="hero-section">
          <h1>Gracias por Explorar</h1>
        </section>
      </div>
    </>
  );
};

export default HorizontalScrollSection;
