import React, { useRef, useEffect } from 'react';
import MangaCard from './MangaCard';
import './MangaReading.scss';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Register Draggable plugin
gsap.registerPlugin(Draggable);

// Placeholder data with updated image paths and more items
const readingManga = [
  { id: 1, title: 'Manga Title 1', imageUrl: '/img/Reading/manga01.webp' },
  { id: 2, title: 'Manga Title 2', imageUrl: '/img/Reading/manga02.webp' },
  { id: 3, title: 'Manga Title 3', imageUrl: '/img/Reading/manga03.webp' },
  { id: 4, title: 'Manga Title 4', imageUrl: '/img/Reading/manga04.webp' },
  { id: 5, title: 'Manga Title 4', imageUrl: '/img/Reading/manga05.webp' },
  { id: 6, title: 'Manga Title 4', imageUrl: '/img/Reading/manga06.webp' },
  { id: 7, title: 'Manga Title 4', imageUrl: '/img/Reading/manga07.webp' },
  { id: 8, title: 'Manga Title 4', imageUrl: '/img/Reading/manga08.webp' },
];

const completedManga = [
  { id: 11, title: 'Completed Manga 1', imageUrl: '/img/Completed/manga11.webp' },
  { id: 12, title: 'Completed Manga 2', imageUrl: '/img/Completed/manga12.webp' },
  { id: 13, title: 'Completed Manga 3', imageUrl: '/img/Completed/manga13.webp' },
  { id: 14, title: 'Completed Manga 4', imageUrl: '/img/Completed/manga14.webp' },
  { id: 15, title: 'Completed Manga 5', imageUrl: '/img/Completed/manga15.webp' },
];

const maybeManga = [
  { id: 21, title: 'Maybe Manga 1', imageUrl: '/img/Maybe/manga21.webp' },
  { id: 22, title: 'Maybe Manga 2', imageUrl: '/img/Maybe/manga22.webp' },
  { id: 23, title: 'Maybe Manga 3', imageUrl: '/img/Maybe/manga23.webp' },
  { id: 24, title: 'Maybe Manga 4', imageUrl: '/img/Maybe/manga24.webp' },
  { id: 25, title: 'Maybe Manga 5', imageUrl: '/img/Maybe/manga25.webp' },
  { id: 26, title: 'Maybe Manga 6', imageUrl: '/img/Maybe/manga26.webp' },
  { id: 27, title: 'Maybe Manga 7', imageUrl: '/img/Maybe/manga27.webp' },
];


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
        // Use getBoundingClientRect().width for a more reliable width including padding
        const cardsWidth = cardsElement.getBoundingClientRect().width;
        const viewportWidth = viewportElement.getBoundingClientRect().width;

        if (cardsWidth > viewportWidth) {
           // Add a class to the viewport to indicate it's draggable (for cursor styling)
           viewportElement.classList.add('is-draggable');
          return Draggable.create(cardsElement, {
            type: "x", // Only allow horizontal dragging
            bounds: viewportElement, // Set bounds back to the viewport
            inertia: true, // Add inertia for a smoother feel
            edgeResistance: 0.9, // Resistance when hitting bounds
          })[0]; // Draggable.create returns an array, get the first instance
        } else {
           // Remove the draggable class if not overflowing
           viewportElement.classList.remove('is-draggable');
        }
      }
      return null; // Return null if no Draggable instance was created
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
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="manga-reading-container" ref={containerRef}> {/* Attach ref here */}
      <section className="manga-section">
        <h2 className="manga-section__title">Reading</h2>
        {/* Viewport container - overflow: hidden restored */}
        <div className="manga-section__viewport" ref={readingViewportRef}>
          {/* Inner container to be dragged */}
          <div className="manga-section__cards-container" ref={readingCardsRef}>
            {readingManga.map(manga => (
              <MangaCard key={manga.id} title={manga.title} imageUrl={manga.imageUrl} section="reading" />
            ))}
          </div>
        </div>
      </section>

      <section className="manga-section">
        <h2 className="manga-section__title">Completed</h2>
         {/* Viewport container - overflow: hidden restored */}
        <div className="manga-section__viewport" ref={completedViewportRef}>
           {/* Inner container to be dragged */}
          <div className="manga-section__cards-container" ref={completedCardsRef}>
            {completedManga.map(manga => (
              <MangaCard key={manga.id} title={manga.title} imageUrl={manga.imageUrl} section="completed" />
            ))}
          </div>
        </div>
      </section>

      <section className="manga-section">
        <h2 className="manga-section__title">Maybe</h2>
         {/* Viewport container - overflow: hidden restored */}
        <div className="manga-section__viewport" ref={maybeViewportRef}>
           {/* Inner container to be dragged */}
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
