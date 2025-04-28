'use client'

import Image from 'next/image'
import Verify from "../verify";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Cocainenomics.module.css';

const Cocainenomics = () => {
    const sectionRef = useRef(null);
    const dividerRef = useRef(null);
    const verifyRef = useRef(null);
    const verifyContainerRef = useRef(null);
    const [dividerHeight, setDividerHeight] = useState(0);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Measure divider height after it's loaded
            if (dividerRef.current) {
                const updateDividerHeight = () => {
                    const height = dividerRef.current.offsetHeight;
                    setDividerHeight(height);
                }
                
                // Wait for images to load to get correct height
                const img = dividerRef.current.querySelector('img');
                if (img) {
                    if (img.complete) {
                        updateDividerHeight();
                    } else {
                        img.onload = updateDividerHeight;
                    }
                }
                
                // Also update on window resize
                window.addEventListener('resize', updateDividerHeight);
                return () => window.removeEventListener('resize', updateDividerHeight);
            }
        }
    }, []);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (sectionRef.current && dividerRef.current && verifyRef.current && verifyContainerRef.current) {
                const divider = dividerRef.current;
                const section = sectionRef.current;
                const verify = verifyRef.current;
                const verifyContainer = verifyContainerRef.current;
                
                // Set initial position - Verify component starts hidden below
                gsap.set(verify, { 
                    y: '-17%', // Start below the viewport
                });
                
                // Apply top padding to the container based on divider height
                // This ensures the content starts below the divider
                if (dividerHeight > 0) {
                    gsap.set(verifyContainer, {
                        paddingTop: dividerHeight * 0.8, // 80% of divider height to account for overlap
                    });
                }
                
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
    }, [dividerHeight]); // Re-run when divider height changes
    
    return (
        <div id="cocainenomics" ref={sectionRef} className="bg-black h-full w-full">
            {/* Divider with high z-index to stay above Verify */}
            <div ref={dividerRef} className="relative w-full z-20 sticky top-0 left-0 right-0">
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
            
            {/* Container for Verify with overflow hidden */}
            <div 
                ref={verifyContainerRef} 
                className="relative overflow-hidden"
                style={{ marginTop: `-${dividerHeight * 0.9}px` }} // Negative margin to allow overlap
            >
                {/* Verify component - This will be revealed */}
                <div 
                    ref={verifyRef} 
                    className={`${styles.fadeBottom} relative w-full z-10 overflow-hidden`}
                >
                    <Verify />
                </div>
            </div>
        </div>
    );
}

export default Cocainenomics;