'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextReveal.css'

const TextReveal = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if animations timeline is supported
    if (!CSS.supports('animation-timeline: scroll()')) {
      // Register the ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      const scrub = 0.5;
      const trigger = '.reveal-section';
      
      // Set initial state
      gsap.set('.text-reveal-wrapper p > span', {
        '--progress': 0,
        backgroundPositionX: 'calc(-200vmax + (var(--progress) * 200vmax)), calc(-200vmax + (var(--progress) * 200vmax)), 0',
        color: 'transparent',
      });

      // Animate the background position
      gsap.to('.text-reveal-wrapper p > span', {
        '--progress': 1,
        scrollTrigger: {
          trigger,
          scrub,
          start: 'top top',
          end: 'top top-=75%'
        }
      })

      // Animate the text color
      gsap.to('.text-reveal-wrapper p > span', {
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
      if (typeof window !== 'undefined' && gsap.registerPlugin) {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <div className="text-reveal-wrapper">
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
    </div>
  );
};

export default TextReveal; 