import { useState, useRef } from 'react';
import gsap from 'gsap';
import './Folder.scss';

const Folder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const folderRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Solo activar si se hace clic en la carpeta o sus hijos directos
    if (folderRef.current && !folderRef.current.contains(e.target as Node)) return;
    
    setIsOpen(!isOpen);
    
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' }
    });
    
    if (!isOpen) {
      // Animación de apertura
      tl.to(frontRef.current, {
        rotationX: -75,
        duration: 0.8,
        transformOrigin: 'bottom',
        z: 50,
        ease: 'power2.inOut'
      })
      .to(sheetRef.current, {
        y: -20,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.4')
      .to(contentRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.2');
    } else {
      // Animación de cierre
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
      .to(sheetRef.current, {
        y: 0,
        opacity: 0.6,
        duration: 0.5,
        ease: 'power2.inOut'
      })
      .to(frontRef.current, {
        rotationX: 0,
        z: 0,
        transformOrigin: 'bottom',
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.3');
    }
  };

  return (
    <div className="folder-container">
      <div className="folder" ref={folderRef} onClick={handleClick}>
        <div className="folder-back">
          <div className="folder-tab"></div>
        </div>
        <div className="folder-sheet" ref={sheetRef}>
          <div className="folder-content" ref={contentRef}>
            <h3>¡FOLLOW ME!</h3>
            <p>Give the component love with your like :D</p>
          </div>
        </div>
        <div className="folder-front" ref={frontRef}>
        </div>
      </div>
    </div>
  );
};

export default Folder; 