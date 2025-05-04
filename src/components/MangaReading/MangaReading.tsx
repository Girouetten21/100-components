import React, { useRef, useEffect } from 'react';
import MangaCard from './MangaCard';
import './MangaReading.scss';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { readingManga, completedManga, maybeManga } from './mangaImages';

// Register Draggable plugin
gsap.registerPlugin(Draggable);

const MangaReading: React.FC = () => {
  // Ref for the main container (used as bounds for Draggable)
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for the inner card containers (the elements to be dragged)
  const readingCardsRef = useRef<HTMLDivElement>(null);
  const completedCardsRef = useRef<HTMLDivElement>(null);
  const maybeCardsRef = useRef<HTMLDivElement>(null);

  // Refs for the outer viewport containers (still needed to structure the HTML)
  const readingViewportRef = useRef<HTMLDivElement>(null);
  const completedViewportRef = useRef<HTMLDivElement>(null);
  const maybeViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to create Draggable instance if content overflows
    const createDraggable = (cardsElement: HTMLDivElement | null, viewportElement: HTMLDivElement | null) => {
      if (cardsElement && viewportElement) {
        // Check if the content width exceeds the viewport width
        const cardsWidth = cardsElement.getBoundingClientRect().width;
        const viewportWidth = viewportElement.getBoundingClientRect().width;

        if (cardsWidth > viewportWidth) {
          // Add a class to the viewport to indicate it's draggable
          viewportElement.classList.add('is-draggable');
          return Draggable.create(cardsElement, {
            type: "x", // Only allow horizontal dragging
            bounds: viewportElement, // Set bounds back to the viewport
            inertia: true, // Add inertia for a smoother feel
            edgeResistance: 0.9, // Resistance when hitting bounds
          })[0];
        } else {
          // Remove the draggable class if not overflowing
          viewportElement.classList.remove('is-draggable');
        }
      }
      return null;
    };

    let readingDraggable: Draggable | null = null;
    let completedDraggable: Draggable | null = null;
    let maybeDraggable: Draggable | null = null;

    const initDraggables = () => {
      // Kill existing instances before creating new ones
      readingDraggable?.kill();
      completedDraggable?.kill();
      maybeDraggable?.kill();

      // Create new instances conditionally
      readingDraggable = createDraggable(readingCardsRef.current, readingViewportRef.current);
      completedDraggable = createDraggable(completedCardsRef.current, completedViewportRef.current);
      maybeDraggable = createDraggable(maybeCardsRef.current, maybeViewportRef.current);
    };

    // Initialize on mount
    initDraggables();

    // Re-initialize on window resize to handle responsive layout changes
    window.addEventListener('resize', initDraggables);

    // Clean up Draggable instances and resize listener on component unmount
    return () => {
      readingDraggable?.kill();
      completedDraggable?.kill();
      maybeDraggable?.kill();
      window.removeEventListener('resize', initDraggables);
    };
  }, []);

  return (
    <div className="manga-reading-container" ref={containerRef}>
      <section className="manga-section">
        <h2 className="manga-section__title">Reading</h2>
        <div className="manga-section__viewport" ref={readingViewportRef}>
          <div className="manga-section__cards-container" ref={readingCardsRef}>
            {readingManga.map(manga => (
              <MangaCard key={manga.id} title={manga.title} imageUrl={manga.imageUrl} section="reading" />
            ))}
          </div>
        </div>
      </section>

      <section className="manga-section">
        <h2 className="manga-section__title">Completed</h2>
        <div className="manga-section__viewport" ref={completedViewportRef}>
          <div className="manga-section__cards-container" ref={completedCardsRef}>
            {completedManga.map(manga => (
              <MangaCard key={manga.id} title={manga.title} imageUrl={manga.imageUrl} section="completed" />
            ))}
          </div>
        </div>
      </section>

      <section className="manga-section">
        <h2 className="manga-section__title">Maybe</h2>
        <div className="manga-section__viewport" ref={maybeViewportRef}>
          <div className="manga-section__cards-container" ref={maybeCardsRef}>
            {maybeManga.map(manga => (
              <MangaCard key={manga.id} title={manga.title} imageUrl={manga.imageUrl} section="maybe" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MangaReading;