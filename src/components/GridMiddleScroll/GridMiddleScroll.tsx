import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GridMiddleScroll.scss";

gsap.registerPlugin(ScrollTrigger);

const GridMiddleScroll = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const tertiaryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    const tertiary = tertiaryRef.current;
    const section = sectionRef.current;

    if (!primary || !secondary || !tertiary || !section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top-=20 top",
        end: "+=100%",
        scrub: 1, // Use a scrub value for smoother scrubbing
        pin: true,
        markers: true, // Add debug markers
      },
    });

    // Set the base state for the secondary column which doesn't animate
    gsap.set(secondary, {
      width: "33.333%",
      left: "33.333%",
    });

    // Set the final state for the primary and tertiary columns
    gsap.set(primary, {
      width: "33.333%",
      left: "0%",
    });
    gsap.set(tertiary, {
      width: "33.333%",
      left: "66.666%",
    });

    // Animate from the "covered" state
    tl.from(primary, {
      width: "50%",
      ease: "none",
    }).from(
      tertiary,
      {
        width: "50%",
        left: "50%",
        ease: "none",
      },
      "<" // Start at the same time
    );

    return () => {
      // Kill all scroll triggers to avoid memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="section">
        <div className="grid">
          <div ref={primaryRef} className="column primary">
            <h2>Primary</h2>
          </div>
          <div ref={secondaryRef} className="column secondary">
            <h2>Secondary</h2>
          </div>
          <div ref={tertiaryRef} className="column tertiary">
            <h2>Tertiary</h2>
          </div>
        </div>
      </section>
      {/* Add some extra space to allow for scrolling */}
      <div style={{ height: "100vh" }}></div>
    </>
  );
};

export default GridMiddleScroll;