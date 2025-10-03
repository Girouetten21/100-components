import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionZoom.css'; // Importa los estilos
import backgroundImage from './img/01.jpg';

// Registra el plugin de ScrollTrigger una sola vez
gsap.registerPlugin(ScrollTrigger);

const SectionZoom: React.FC = () => {
    // Referencias para GSAP y ScrollTrigger
    const backgroundRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!backgroundRef.current || !imageRef.current || !containerRef.current) return;

        // El contexto de GSAP ayuda a limitar la animación a este componente
        const ctx = gsap.context(() => {

            // Centrar la imagen inicialmente
            gsap.set(imageRef.current, {
                xPercent: -50,
                yPercent: -50,
                top: '50%',
                left: '50%',
            });

            // Calcular la escala necesaria para cubrir la sección
            const scaleValue = Math.max(
                backgroundRef.current.offsetWidth / imageRef.current.offsetWidth,
                backgroundRef.current.offsetHeight / imageRef.current.offsetHeight
            );

            // 1. Configuración de ScrollTrigger para la sección de Background (Pinning)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: backgroundRef.current,
                    start: 'top-=20 top',
                    end: '+=200%', 
                    pin: true, // Fija la sección en el viewport
                    scrub: 1, // Vincula la animación al movimiento de scroll
                    pinSpacing: true,
                }
            });

            // 2. Animación de Zoom de la Imagen
            tl.to(imageRef.current, {
                scale: scaleValue,
                ease: 'none',
            });

            // 3. Animación de los paneles de texto
            tl.to('.panel', {
                opacity: 1,
                stagger: 0.2,
                ease: 'power2.inOut'
            }, "-=0.5");

        }, containerRef); 

        // Función de limpieza: Elimina las instancias de ScrollTrigger y GSAP
        return () => ctx.revert(); 
    }, []); 

    return (
        <div className="scroll-container" ref={containerRef}>
            {/* 1. SECCIÓN DE INICIO */}
            <section id="inicio" className="section-hero">
                <h1>🚀 Sección de Inicio</h1>
            </section>

            {/* 2. SECCIÓN DE BACKGROUND (Con Animación) */}
            <section ref={backgroundRef} id="background" className="section-background">
                {/* Contenido en el centro, encima de la imagen */}
                <div className="content-center">
                    <h2>Scroll para hacer zoom</h2>
                </div>
                
                {/* Imagen animada */}
                <img 
                    ref={imageRef} 
                    src={backgroundImage} 
                    alt="Background Zoom" 
                    className="background-image-zoom"
                />

                {/* Paneles de texto */}
                <div className="text-panels-grid">
                    <div className="panel">
                        <h3>Exploración Cósmica</h3>
                        <p>Descubre las maravillas del universo y los secretos que se esconden en las estrellas.</p>
                    </div>
                    <div className="panel">
                        <h3>Tecnología Avanzada</h3>
                        <p>La innovación nos impulsa hacia el futuro, creando herramientas para nuevos descubrimientos.</p>
                    </div>
                    <div className="panel">
                        <h3>Nuevos Horizontes</h3>
                        <p>Cada viaje nos lleva más allá de los límites conocidos, hacia lo inexplorado.</p>
                    </div>
                    <div className="panel">
                        <h3>El Futuro es Ahora</h3>
                        <p>Somos los arquitectos de mañana, construyendo un legado para las generaciones venideras.</p>
                    </div>
                </div>
            </section>

            {/* 3. SECCIÓN FINAL */}
            <section id="final" className="section-hero">
                <h1>🎉 Sección Final</h1>
            </section>
        </div>
    );
};

export default SectionZoom;