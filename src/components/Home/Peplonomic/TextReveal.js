'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TextReveal = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register the ScrollTrigger plugin
   

    // Check if animations timeline is supported
    if (!CSS.supports('animation-timeline: scroll()')) {

      gsap.registerPlugin(ScrollTrigger);

      const scrub = 0.5;
      const trigger = '.reveal-section';
      // Set initial state
      gsap.set('.reveal-text', {
        '--progress': 0,
        backgroundPositionX: 'calc(-200vmax + (var(--progress) * 200vmax)), calc(-200vmax + (var(--progress) * 200vmax)), 0',
        color: 'transparent',
      });

      // Animate the background position
      gsap.to('p > span', {
        '--progress': 1,
        scrollTrigger: {
          trigger,
          scrub,
          start: 'top top',
          end: 'top top-=75%'
        }
      })

      // Animate the text color
      gsap.to('p > span', {
        color: 'black',
        scrollTrigger: {
          trigger,
          scrub,
          start: 'top top-=75%',
          end: 'bottom bottom'
        }
      })
    }

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="text-reveal-main">
      <section className="reveal-section">
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-normal font-fuel-decay text-black">$CRTL</h1>
        <p>
          <span>
            Bridging together the Peplo universe, memes, characters and lore with the utility of AI and DeFi to bring you a whole new crypto sector: MemeFAi
          </span>
        </p>
        </div>
      </section>
    </main>
  );
};

export default TextReveal; 