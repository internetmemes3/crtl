'use client'

import Image from 'next/image'
import Verify from "../verify";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Cocainenomics = () => {
    const sectionRef = useRef(null);
    const dividerRef = useRef(null);
    const verifyRef = useRef(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            if (sectionRef.current && dividerRef.current && verifyRef.current) {
                const divider = dividerRef.current;
                const section = sectionRef.current;
                const verify = verifyRef.current;
                
                // Set initial position - Verify component starts hidden below
                gsap.set(verify, { 
                    y: '-20%', // Start below the viewport
                });
                
                // Create the scroll animation
                const tl = gsap.timeline({
                });
                
                // Animate the verify component upward (revealing it from bottom)
                
                
                return () => {
                    // Clean up
                    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                };
            }
        }
    }, []);
    return (
        <div id="cocainenomics" ref={sectionRef} className="bg-black h-full w-full">
                <div ref={dividerRef} className="relative w-full z-10">
                    <Image
                        src="/divider/powerwhitedividerbottom.png"
                        alt="Divider"
                        width={0} 
                        height={0} 
                        sizes="100vw" 
                        className="w-full h-auto object-top"
                        quality={100}
                    />
                </div>
                <div className="relative">
                {/* Verify component - This will be revealed */}
                <div ref={verifyRef} className="relative w-full z-0 overflow-hidden">
                    <Verify />
                </div>
            </div>
            </div>

    );
}

export default Cocainenomics;