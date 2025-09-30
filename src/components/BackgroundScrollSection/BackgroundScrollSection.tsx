import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BackgroundScrollSection.css';
import img1 from './img/1.jpg';
import img2 from './img/2.jpg';
import img3 from './img/3.jpg';
import img4 from './img/4.jpg';
import img5 from './img/5.jpg';

gsap.registerPlugin(ScrollTrigger);

const BackgroundScrollSection: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Sistema de timestamp para bloquear el spam de scroll
  const lastScrollTimeRef = useRef(0); 
  const COOLDOWN_TIME = 1000; // 1000ms de bloqueo

  const images = [img1, img2, img3, img4, img5];
  const numImages = images.length;

  const handleWheel = useCallback((e: WheelEvent) => {
    const deltaY = e.deltaY;
    
    // --- Lógica de Liberación: Salida Controlada del Pin ---
    
    // Salir hacia la Sección Final (Scroll Down en Imagen 5)
    if (deltaY > 0 && currentImageIndex === numImages - 1) {
        // Aumentado a 100px para una salida más decisiva contra el spam
        window.scrollBy(0, 100); 
        return; 
    }
    
    // Salir hacia la Sección Inicial (Scroll Up en Imagen 1)
    if (deltaY < 0 && currentImageIndex === 0) {
        // Aumentado a 100px para una salida más decisiva contra el spam
        window.scrollBy(0, -100); 
        return; 
    }
    
    // Si estamos DENTRO de la secuencia de imágenes, BLOQUEAMOS el scroll nativo.
    e.preventDefault(); 
    
    // -------------------------------------------------------------------
    
    const currentTime = Date.now();
    let newIndex = currentImageIndex;
    let shouldUpdate = false;
    
    // 1. Bloqueo Total (Cooldown Check)
    if (currentTime - lastScrollTimeRef.current < COOLDOWN_TIME) {
      return; 
    }

    // 2. Lógica de Navegación de Imágenes
    if (deltaY > 0) { // Scroll down
      newIndex = currentImageIndex + 1;
      shouldUpdate = true;
    } else if (deltaY < 0) { // Scroll up
      newIndex = currentImageIndex - 1;
      shouldUpdate = true;
    }

    // Aseguramos que el índice esté dentro de los límites
    newIndex = Math.max(0, Math.min(newIndex, numImages - 1));

    if (shouldUpdate) {
      // 3. Actualizar y Aplicar el Cooldown
      lastScrollTimeRef.current = currentTime; 
      setCurrentImageIndex(newIndex);
    } 

  }, [currentImageIndex, numImages]);

  useEffect(() => {
    if (!backgroundRef.current) return;

    // Matar triggers previos para evitar desincronización
    ScrollTrigger.getAll().forEach(t => t.kill()); 
    
    // El PIN debe durar lo suficiente
    const trigger = ScrollTrigger.create({
      trigger: backgroundRef.current,
      start: "top top",
      // Mantenemos *2 para un espacio muerto corto y estético
      end: `+=${window.innerHeight * 2}`, 
      pin: true,
      
      // onEnter / onEnterBack: Tomar el control del scroll (Añadir listener)
      onEnter: () => {
        window.addEventListener('wheel', handleWheel, { passive: false });
      },
      onEnterBack: () => {
        window.addEventListener('wheel', handleWheel, { passive: false });
      },
      // onLeave / onLeaveBack: Liberar el control (Remover listener)
      onLeave: () => {
        window.removeEventListener('wheel', handleWheel);
      },
      onLeaveBack: () => {
        window.removeEventListener('wheel', handleWheel);
      },
    });

    scrollTriggerRef.current = trigger;

    // Cleanup: Limpieza estricta
    return () => {
      // Aseguramos que el listener se remueva al desmontar
      window.removeEventListener('wheel', handleWheel);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [handleWheel]); 
  
  const style = {
    backgroundImage: `url(${images[currentImageIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="background-scroll-section">
      {/* Sección Inicial */}
      <section className="section initial-section">
        <div className="section-content">
          <h1>Comienzo del Componente</h1>
          <p>Haz scroll hacia abajo para entrar en la sección de fondos.</p>
        </div>
      </section>

      {/* Sección de Fondo Animado (Pinned) */}
      <section
        ref={backgroundRef}
        className="section background-section"
        style={style}
      >
        <div className="section-content">
          <h1>Fondo {currentImageIndex + 1} / {numImages}</h1>
          <p>Scroll bloqueado. Espera {COOLDOWN_TIME / 1000}s entre cada cambio.</p>
        </div>
      </section>

      {/* Sección Final */}
      <section className="section final-section">
        <div className="section-content">
          <h1>Fin del Componente</h1>
          <p>Has terminado la secuencia.</p>
        </div>
      </section>
    </div>
  );
};

export default BackgroundScrollSection;