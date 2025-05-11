'use client'
import PowderText from '../Powder';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';

// Register plugins outside of component
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef(null);
  const powderRef = useRef(null);
  const dividerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
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
  
  
  const checkMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  };
  
  
  useEffect(() => {
    
    setIsMobile(checkMobile());
    
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(checkMobile());
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
 
  useLayoutEffect(() => {
    
    clearScrollTriggers();
    
    if (!containerRef.current || !powderRef.current || !dividerRef.current) {
      return;
    }
    
   
    const initTimeout = setTimeout(() => {
      const container = containerRef.current;
      const powderSection = powderRef.current;
      const divider = dividerRef.current;
      
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top", 
          end: "bottom top",
          pin: powderSection,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
          markers: false,
        }
      });
      
     
      tl.to(powderSection, {
        opacity: -0.5,
        duration: 0.5,
        ease: "power2.out"
      }, 0);
      
      
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }
      
    
      const dividerTl = gsap.timeline({
        scrollTrigger: {
          trigger: divider,
          start: "top bottom",
          end: "top top", 
          scrub: true,
          markers: false,
          invalidateOnRefresh: true,
        }
      });
      
      if (dividerTl.scrollTrigger) {
        scrollTriggersRef.current.push(dividerTl.scrollTrigger);
      }
      
      
      ScrollTrigger.refresh();
    }, 100);
    
    
    return () => {
      clearTimeout(initTimeout);
      clearScrollTriggers();
    };
  }, [isMobile]); 
  
  
  useEffect(() => {
    return () => {
      clearScrollTriggers();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black">
      
      <div 
        ref={powderRef} 
        className={`flex flex-col items-center justify-center w-full ${
          isMobile ? 'pt-20 pb-8' : 'pt-40 pb-16'
        }`}
      >
        {isMobile ? (
          <div className="w-full px-4">
            <Image
              src="/cartel/crtl.jpg"
              alt="CRTL"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-contain"
              priority={true}
            />
          </div>
        ) : (
          <PowderText text="Cartel Over Cabal" />
        )}
      </div>
      <div ref={dividerRef} className="relative w-full">
        <Image
          src="/divider/powerwhitedivider.png"
          alt="Divider"
          width={0} 
          height={0} 
          sizes="100vw" 
          className="w-full h-auto object-top"
          quality={100}
          priority={true}
        />
      </div>
    </div>
  );
}

export default Hero;
