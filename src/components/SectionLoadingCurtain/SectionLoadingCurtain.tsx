import { useState, useLayoutEffect, useRef, CSSProperties } from 'react';
import gsap from 'gsap';
import './BorealLoading.scss';
import './SectionLoadingCurtain.css';
import ArrowIcon from './img/arrow.svg';

const Loading = () => (
    <div className="container-loader">
        <div className="loader">
            {Array.from({ length: 10 }, (_, i) => (
                <div
                    key={i}
                    className="aro"
                    style={{ '--s': i + 1 } as CSSProperties}
                ></div>
            ))}
        </div>
    </div>
);

const SectionLoadingCurtain = () => {
  const [show, setShow] = useState(true);
  const comp = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline({
        delay: 3,
        onComplete: () => {
          setShow(false);
        },
      });
      t1.to(loader.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'sine.inOut',
      })
        .to(
          sectionRef.current,
          {
            width: 'calc(100vw - 40px)',
            height: 'calc(100vh - 40px)',
            margin: '20px',
            borderRadius: '32px',
            duration: 0.5,
            ease: 'sine.inOut',
          },
          '+=0.1'
        )
        .addLabel('contentStart', '+=0') // Label for content animation start
        .from(
          topLeftRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: 'power4.out',
          },
          'contentStart+=0.1'
        )
        .from(
          centerContentRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power4.out',
          },
          'contentStart+=0.4'
        )
        .from(
          bottomRightRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power4.out',
          },
          'contentStart+=0.7'
        );
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div className="SectionLoadingCurtain" ref={comp}>
      {show && (
        <div
          ref={loader}
          className="loading-container"
        >
          <Loading />
        </div>
      )}
      <section className="section" ref={sectionRef}>
        <div className="top-left-text" ref={topLeftRef}>
          <h3>THE NORTHERN LIGHTS</h3>
          <p>The Celestial Light</p>
          <p>The Sky Dancers</p>
          <p>The Polar Veil</p>
        </div>
        <div className="center-content" ref={centerContentRef}>
          <h1>DISCOVER THE GREEN LADY</h1>
          <h2>A journey that will leave you speechless: capture the aurora at its peak.</h2>
          <h2>Prepare your camera and your coat: unforgettable memories await.</h2>
        </div>
        <div className="bottom-right-box" ref={bottomRightRef}>
          <h3>The beautiful lights</h3>
          <p>
            Discover our beauty gallery and let the magic inspire you. Ready to witness the wonder? Let's start planning!
          </p>
          <button>
            <span>Go to Gallery</span>
            <div className="icon-circle">
              <img src={ArrowIcon} alt="arrow icon" />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SectionLoadingCurtain;