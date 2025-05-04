import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './MangaCard.scss';

interface MangaCardProps {
  title: string;
  imageUrl: string;
  section: 'reading' | 'completed' | 'maybe';
}

const MangaCard: React.FC<MangaCardProps> = ({ title, imageUrl, section }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseEnter = () => {
      // Randomly choose between -5 and +5 degrees rotation
      const randomRotation = Math.random() < 0.5 ? -5 : 5;

      // Increase scale, zIndex, and apply the random rotation
      gsap.to(card, { scale: 1.15, zIndex: 50, rotation: randomRotation, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      // Reset scale, zIndex, and rotation
      gsap.to(card, { scale: 1, zIndex: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
    };

    if (card) {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Add a class based on the section prop
  const cardClassName = `manga-card manga-card--${section}`;

  return (
    <div className={cardClassName} ref={cardRef}>
      <div className="manga-card__image-container">
        <img src={imageUrl} alt={title} className="manga-card__image" />
      </div>
      <div className="manga-card__title">
        {title}
      </div>
    </div>
  );
};

export default MangaCard;
