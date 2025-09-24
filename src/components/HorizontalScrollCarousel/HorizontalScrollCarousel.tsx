import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalScrollCarousel.css";
import { images, names, banner01, banner02 } from "./gems";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollCarousel: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const horizontal = horizontalRef.current;
    const section = containerRef.current;
    if (!wrapper || !horizontal || !section) return;

    const totalScrollWidth = horizontal.scrollWidth;
    const viewportWidth = section.clientWidth;
    // Adjust scrollDistance to not exceed the max translateX value (-300px)
    const maxTranslateX = -3000;
    const scrollDistance = Math.min(totalScrollWidth - viewportWidth, Math.abs(maxTranslateX));

    const ctx = gsap.context(() => {
      gsap.to(horizontal, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper, // <-- Cambia aquí
          start: "top-=20 top",
          end: () => `+=${scrollDistance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero inicial */}
      <div className="carousel-wrapper">
        <section className="carousel-hero" style={{ backgroundImage: `url(${banner01})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h1>HorizontalScroll ScrollTrigger</h1>
        </section>
      </div>

      {/* Carrusel horizontal */}
      <div className="carousel-wrapper" ref={wrapperRef}>
        <section ref={containerRef} className="carousel-section">
          <div ref={horizontalRef} className="carousel-track">
            {Array.from({ length: 9 }, (_, i) => {
              if (i === 0) {
                return (
                  <div className="carousel-item description-item" key={i}>
                    <h3>History of the Forest Gems</h3>
                    <h2>Gems from the Forest Branches</h2>
                    <p>
                      In the heart of the earth, far from known maps and roads, lies the Forest of Aethel. It is no place of common trees; its trunks are not made of wood, but of the wrinkled bark of an ancient stone, a mix of polished granite and brilliant obsidian. Instead of leaves, its branches are covered by a luminous moss that glows in shades of emerald and cyan, illuminating the undergrowth with a soft, ethereal light. The air here does not smell of damp earth or pine, but of ozone and the sweet, mineral fragrance of the ripening gems.
                    </p>
                    <p>
                      The gems of Aethel are not ordinary stones; they are fragments of the very soul of the forest, each one carrying a unique energy and story. The Lost Sun Gem, for example, is said to contain the last rays of a sun that once shone eternally over these lands, while the Autumn Forest Crystal captures the essence of the forest in perpetual fall, with colors that shift from gold to crimson. Each gem is a marvel of nature and magic, coveted by collectors and adventurers alike.
                    </p>
                    <p className="scroll-text">Scroll to discover</p>
                  </div>
                );
              } else {
                const imgIndex = i - 1;
                return (
                  <div className="carousel-item gem-item" key={i}>
                    <img src={images[imgIndex]} alt={names[imgIndex]} />
                    <div className="item-text">{names[imgIndex]}</div>
                  </div>
                );
              }
            })}
          </div>
        </section>
      </div>

      {/* Hero final */}
      <div className="carousel-wrapper">
        <section className="carousel-hero" style={{ backgroundImage: `url(${banner02})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h1>Thanks for watching</h1>
        </section>
      </div>
    </>
  );
};

export default HorizontalScrollCarousel;
