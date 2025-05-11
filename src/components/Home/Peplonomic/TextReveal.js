'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextReveal.css'


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TextReveal = () => {
  const scrollTriggersRef = useRef([]);
  
 
  const clearScrollTriggers = () => {
    if (scrollTriggersRef.current.length) {
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });
      scrollTriggersRef.current = [];
    }
  };
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    
    if (!CSS.supports('animation-timeline: scroll()')) {
      
      gsap.set('.text-reveal-wrapper p > span', {
        '--progress': 0,
        backgroundPositionX: 'calc(-200vmax + (var(--progress) * 200vmax)), calc(-200vmax + (var(--progress) * 200vmax)), 0',
        color: 'transparent',
      });

      const scrub = 0.5;
      const trigger = '.reveal-section';
      
      
      const initTimeout = setTimeout(() => {
      
        const bgTween = gsap.to('.text-reveal-wrapper p > span', {
        '--progress': 1,
        scrollTrigger: {
          trigger,
          scrub,
          start: 'top top',
            end: 'top top-=75%',
            invalidateOnRefresh: true,
            id: 'bgTween'
        }
        });
        
        if (bgTween.scrollTrigger) {
          scrollTriggersRef.current.push(bgTween.scrollTrigger);
        }

      
        const colorTween = gsap.to('.text-reveal-wrapper p > span', {
        color: 'black',
        scrollTrigger: {
          trigger,
          scrub,
          start: 'top top-=75%',
            end: 'bottom bottom',
            invalidateOnRefresh: true,
            id: 'colorTween'
        }
        });
        
        if (colorTween.scrollTrigger) {
          scrollTriggersRef.current.push(colorTween.scrollTrigger);
        }
        
     
        let resizeTimer;
        const handleResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        };
        
        window.addEventListener('resize', handleResize);
        
        
        ScrollTrigger.refresh();
        
        return () => {
          window.removeEventListener('resize', handleResize);
          clearTimeout(resizeTimer);
        };
      }, 100);
      
      return () => {
        clearTimeout(initTimeout);
        clearScrollTriggers();
      };
    }

    return () => {
      clearScrollTriggers();
    };
  }, []);

  return (
    <div className="text-reveal-wrapper">
      <main className="text-reveal-main">
        <section className="reveal-section">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-normal font-fuel-decay text-black">$CRTL</h1>
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