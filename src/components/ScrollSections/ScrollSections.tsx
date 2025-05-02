import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './ScrollSections.scss';
import './Grid.scss';

// Importar imágenes Green
import green1 from './img/Green/1.png';
import green2 from './img/Green/2.png';
import green3 from './img/Green/3.png';
import green4 from './img/Green/4.png';
import green5 from './img/Green/5.png';
import green6 from './img/Green/6.png';
import green7 from './img/Green/7.png';
import greenBackground from './img/Green/Background.webp';

// Importar imágenes Red
import red1 from './img/Red/1.png';
import red2 from './img/Red/2.png';
import red3 from './img/Red/3.png';
import red4 from './img/Red/4.png';
import red5 from './img/Red/5.png';
import red6 from './img/Red/6.png';
import red7 from './img/Red/7.png';
import redBackground from './img/Red/Background.webp';

// Importar imágenes Yellow
import yellow1 from './img/Yellow/1.png';
import yellow2 from './img/Yellow/2.png';
import yellow3 from './img/Yellow/3.png';
import yellow4 from './img/Yellow/4.png';
import yellow5 from './img/Yellow/5.png';
import yellow6 from './img/Yellow/6.png';
import yellow7 from './img/Yellow/7.png';
import yellowBackground from './img/Yellow/Background.webp';

gsap.registerPlugin(ScrollTrigger);

const ScrollSections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<number | null>(null);
  const gridRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sections = [
    { 
      title: 'Scroll Sections', 
      color: 'green',
      background: greenBackground,
      images: {
        div1: green1,
        div2: green2,
        div3: green3,
        div4: green4,
        div5: green5,
        div6: green6,
        div7: green7
      }
    },
    { 
      title: 'React + GSAP', 
      color: 'red',
      background: redBackground,
      images: {
        div1: red1,
        div2: red2,
        div3: red3,
        div4: red4,
        div5: red5,
        div6: red6,
        div7: red7
      }
    },
    { 
      title: 'FOLLOW ME :D', 
      color: 'yellow',
      background: yellowBackground,
      images: {
        div1: yellow1,
        div2: yellow2,
        div3: yellow3,
        div4: yellow4,
        div5: yellow5,
        div6: yellow6,
        div7: yellow7
      }
    },
  ];

  // Efecto para manejar el countdown
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = window.setInterval(() => {
        setCountdown(prev => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            if (timerRef.current) {
              window.clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setIsScrollEnabled(true);
            return 0;
          }
          return newCount;
        });
      }, 300);

      return () => {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
        }
      };
    }
  }, [countdown]);

  const animateGridElements = (direction: 'up' | 'down', isExit: boolean, sectionIndex: number) => {
    const gridElements = Object.entries(gridRefs.current)
      .filter(([key]) => key.startsWith(`${sectionIndex}-`))
      .map(([_, element]) => element)
      .filter(Boolean)
      .reverse();

    const duration = 0.5;
    const stagger = 0.1;

    // Resetear las propiedades de los elementos antes de animar
    gsap.set(gridElements, { clearProps: 'all' });

    return new Promise<void>((resolve) => {
      if (isExit) {
        gsap.to(gridElements, {
          y: direction === 'up' ? -50 : 50,
          opacity: 0,
          duration: duration,
          stagger: stagger,
          ease: "power2.inOut",
          onComplete: resolve
        });
      } else {
        // Asegurarse de que los elementos estén en la posición inicial correcta
        gsap.set(gridElements, {
          y: direction === 'up' ? 50 : -50,
          opacity: 0
        });

        gsap.to(gridElements, {
          y: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          ease: "power2.inOut",
          onComplete: () => {
            // Asegurarse de que los elementos permanezcan visibles
            gsap.set(gridElements, { opacity: 1 });
            resolve();
          }
        });
      }
    });
  };

  const handleSectionChange = async (newSection: number) => {
    if (!isScrollEnabled) return;
    
    // Determinar la dirección del scroll
    const direction = newSection > currentSection ? 'down' : 'up';
    
    // Deshabilitar el scroll
    setIsScrollEnabled(false);
    
    try {
      // 1. Animar la salida de los elementos de la cuadrícula actual
      await animateGridElements(direction, true, currentSection);
      
      // 2. Cambiar la sección
      setCurrentSection(newSection);
      
      // 3. Esperar a que el DOM se actualice completamente
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // 4. Animar la entrada de los elementos de la nueva cuadrícula
      await animateGridElements(direction, false, newSection);
      
      // 5. Establecer el countdown para habilitar el scroll
      setCountdown(2);
    } catch (error) {
      console.error('Error durante la animación:', error);
      setIsScrollEnabled(true);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (!isScrollEnabled) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSection = currentSection + direction;
      
      if (newSection >= 0 && newSection < sections.length) {
        handleSectionChange(newSection);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, sections.length, isScrollEnabled]);

  // Efecto para inicializar las animaciones cuando cambia la sección
  useEffect(() => {
    const direction = 'down'; // dirección por defecto para la primera carga
    const initializeAnimations = async () => {
      await animateGridElements(direction, false, currentSection);
    };
    initializeAnimations();
  }, []);

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      sectionsRef.current[index] = el;
    }
  };

  const setGridRef = (el: HTMLDivElement | null, sectionIndex: number, divName: string) => {
    gridRefs.current[`${sectionIndex}-${divName}`] = el;
  };

  return (
    <div ref={containerRef} className="scroll-container">
      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => setSectionRef(el, index)}
          className={`section ${index === currentSection ? 'active' : ''}`}
          style={{ 
            backgroundImage: `url(${section.background})`,
            display: index === currentSection ? 'block' : 'none',
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        >
          <div className={`content-grid ${section.color}`}>
            <div className="div1" ref={(el) => setGridRef(el, index, 'div1')} style={{ opacity: 0 }}>
              <img src={section.images.div1} alt="Grid 1" />
            </div>
            <div className="div2" ref={(el) => setGridRef(el, index, 'div2')} style={{ opacity: 0 }}>
              <img src={section.images.div2} alt="Grid 2" />
            </div>
            <div className="div3" ref={(el) => setGridRef(el, index, 'div3')} style={{ opacity: 0 }}>
              <img src={section.images.div3} alt="Grid 3" />
            </div>
            <div className="div4" ref={(el) => setGridRef(el, index, 'div4')} style={{ opacity: 0 }}>
              <img src={section.images.div4} alt="Grid 4" />
            </div>
            <div className="div5" ref={(el) => setGridRef(el, index, 'div5')} style={{ opacity: 0 }}>
              <img src={section.images.div5} alt="Grid 5" />
            </div>
            <div className="div6" ref={(el) => setGridRef(el, index, 'div6')} style={{ opacity: 0 }}>
              <img src={section.images.div6} alt="Grid 6" />
            </div>
            <div className="div7" ref={(el) => setGridRef(el, index, 'div7')} style={{ opacity: 0 }}>
              <img src={section.images.div7} alt="Grid 7" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollSections;