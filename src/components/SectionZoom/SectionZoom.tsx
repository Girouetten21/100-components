import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SectionZoom.css'; // Importa los estilos
import backgroundImage from './img/01.jpg';
import heroImage from './img/Hero.jpg';

// Registra el plugin de ScrollTrigger una sola vez
gsap.registerPlugin(ScrollTrigger);

const SectionZoom: React.FC = () => {
    // Referencias para GSAP y ScrollTrigger
    const backgroundRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const backgroundElement = backgroundRef.current;
        const imageElement = imageRef.current;
        const containerElement = containerRef.current;

        if (!backgroundElement || !imageElement || !containerElement) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set(imageElement, {
                xPercent: -50,
                yPercent: -50,
                top: '50%',
                left: '50%',
            });

            const scaleValue = Math.max(
                backgroundElement.offsetWidth / imageElement.offsetWidth,
                backgroundElement.offsetHeight / imageElement.offsetHeight
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: backgroundElement,
                    start: 'top-=20 top',
                    end: '+=200%',
                    pin: true,
                    scrub: 1,
                    pinSpacing: true,
                },
            });

            tl.to(imageElement, {
                scale: scaleValue,
                ease: 'none',
            });

            tl.to('.panel', {
                opacity: 1,
                stagger: 0.2,
                ease: 'power2.inOut',
            }, '-=0.5');
        }, containerElement);

        return () => ctx.revert();
    }, []);

    return (
        <div className="scroll-container" ref={containerRef}>
            {/* 1. SECCIÓN DE INICIO */}
            <section id="inicio" className="section-hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <h1>🚀 Sección Inicial 🚀</h1>
            </section>

            {/* 2. SECCIÓN DE BACKGROUND (Con Animación) */}
            <section ref={backgroundRef} id="background" className="section-background">
                {/* Contenido en el centro, encima de la imagen */}
                <div className="content-center">
                    <h2>(Scroll para hacer zoom)</h2>
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
                        <h3>Singularidad</h3>
                        <p>Aquí, la densidad y la curvatura del espacio-tiempo son infinitas, marcando el fin de la validez de la relatividad general clásica.</p>
                    </div>
                    <div className="panel">
                        <h3>Horizonte</h3>
                        <p>Una vez que la materia o la luz cruzan el horizonte de sucesos, la velocidad necesaria para escapar es mayor que la velocidad de la luz.</p>
                    </div>
                    <div className="panel">
                        <h3>Masa</h3>
                        <p>Según el "teorema de no pelo", los agujeros negros se definen por solo tres propiedades: masa, momento angular (rotación) y carga eléctrica.</p>
                    </div>
                    <div className="panel">
                        <h3>Rotación</h3>
                        <p>Una propiedad llamada rotación o spin, este giro arrastra el espacio-tiempo que lo rodea, creando una región llamada ergosfera.</p>
                    </div>
                </div>  
            </section>

            {/* 3. SECCIÓN FINAL */}
            <section id="final" className="section-hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <h1>🚀 Sección Final 🚀</h1>
            </section>
        </div>
    );
};

export default SectionZoom;
