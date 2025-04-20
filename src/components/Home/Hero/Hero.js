'use client'
import PowderText from '../Powder';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);
  const powderRef = useRef(null);
  const dividerRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      if (containerRef.current && powderRef.current && dividerRef.current) {
        const container = containerRef.current;
        const powderSection = powderRef.current;
        const divider = dividerRef.current;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top", // Start when the top of the container reaches the top of the viewport
            end: "bottom top", // End when the bottom of the container reaches the top of the viewport
            pin: powderSection, // Pin only the powder section
            pinSpacing: false, // Don't add extra space for pinning
            scrub: true, // Smooth scrubbing effect tied to scroll position
            markers: false, // Set to true for debugging
          }
        });
        
        // Add fade out animation for the powder section as it scrolls
        tl.to(powderSection, {
          opacity: -0.5,
          duration: 0.5,
          ease: "power2.out"
        }, 0);
        
        // Create a separate timeline for the divider animation
        gsap.timeline({
          scrollTrigger: {
            trigger: divider,
            start: "top bottom", // Start when the top of the divider reaches the bottom of the viewport
            end: "top top", // End when the top of the divider reaches the top of the viewport
            scrub: true,
            markers: false,
          }
        });
        
        // Cleanup function
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Powder Text Section - This will be pinned */}
      <div ref={powderRef} className="flex flex-col items-center justify-center pt-40 pb-16 w-full">
        <PowderText text="Cartel Over Cabal" />
      </div>
      
      {/* Divider Section - This will scroll normally */}
      <div ref={dividerRef} className="relative w-full">
        <Image
          src="/divider/powerwhitedivider.png"
          alt="Divider"
          width={0} 
          height={0} 
          sizes="100vw" 
          className="w-full h-auto object-top"
          quality={100}
        />
      </div>
    </div>
  );
}

export default Hero;
