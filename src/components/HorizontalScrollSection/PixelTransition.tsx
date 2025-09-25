import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

interface PixelTransitionProps {
  images: string[];
  currentIndex: number;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  images = [],
  currentIndex = 0,
  gridSize = 21,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  className = '',
  style = {},
  aspectRatio = '100%'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelGridRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(currentIndex);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  useEffect(() => {
    if (prevIndexRef.current === currentIndex) return;

    setIsActive(true);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: 'none' });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      setIsActive(false);
      prevIndexRef.current = currentIndex;
    });

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  }, [currentIndex, animationStepDuration]);

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={{ ...style, position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto' }}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div
        className="pixelated-image-card__default"
        style={{
          display: isActive ? 'none' : 'block',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${images[prevIndexRef.current]})`,
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      <div
        className="pixelated-image-card__active"
        ref={activeRef}
        style={{
          display: isActive ? 'block' : 'none',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${images[currentIndex]})`,
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
};

export default PixelTransition;
