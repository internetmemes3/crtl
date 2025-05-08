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
  
  // Function to safely clear ScrollTrigger instances
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
  
  // Function to check if device is mobile
  const checkMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  };
  
  // Set up mobile detection with resize handling
  useEffect(() => {
    // Set initial mobile status
    setIsMobile(checkMobile());
    
    // Update mobile status on resize with debounce
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
  
  // Set up ScrollTrigger animations
  useLayoutEffect(() => {
    // Clear existing ScrollTriggers to prevent duplicates
    clearScrollTriggers();
    
    if (!containerRef.current || !powderRef.current || !dividerRef.current) {
      return;
    }
    
    // Delay initialization slightly to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      const container = containerRef.current;
      const powderSection = powderRef.current;
      const divider = dividerRef.current;
      
      // Animation timeline for fade out effect
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
      
      // Add fade out animation
      tl.to(powderSection, {
        opacity: -0.5,
        duration: 0.5,
        ease: "power2.out"
      }, 0);
      
      // Save the ScrollTrigger for cleanup
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }
      
      // Separate timeline for divider animation
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
      
      // Force a refresh to ensure all measurements are accurate
      ScrollTrigger.refresh();
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(initTimeout);
      clearScrollTriggers();
    };
  }, [isMobile]); // Re-run when mobile state changes
  
  // Final cleanup on component unmount
  useEffect(() => {
    return () => {
      clearScrollTriggers();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Powder Text Section - This will be pinned */}
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
