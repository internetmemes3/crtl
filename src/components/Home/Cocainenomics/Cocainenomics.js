'use client'

import Image from 'next/image'
import Verify from "../verify";
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Cocainenomics.module.css';

const Cocainenomics = () => {
    const sectionRef = useRef(null);
    const dividerRef = useRef(null);
    const verifyRef = useRef(null);
    const verifyContainerRef = useRef(null);
    const [dividerHeight, setDividerHeight] = useState(0);
    const scrollTriggersRef = useRef([]);
    
    // Register plugins outside of any effects - this only needs to happen once
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Function to clear all ScrollTrigger instances safely
    const clearScrollTriggers = () => {
        // Clear any specific ScrollTrigger instances we've saved
        if (scrollTriggersRef.current.length) {
            scrollTriggersRef.current.forEach(trigger => {
                if (trigger && trigger.kill) {
                    trigger.kill();
                }
            });
            scrollTriggersRef.current = [];
        }
    };
    
    // Measure divider height after it's loaded
    useEffect(() => {
        const updateDividerHeight = () => {
            if (!dividerRef.current) return;
            
            const height = dividerRef.current.offsetHeight;
            if (height > 0 && height !== dividerHeight) {
                setDividerHeight(height);
            }
        };
        
        // Initial measurement
        updateDividerHeight();
        
        // Wait for images to load to get correct height
        if (dividerRef.current) {
            const img = dividerRef.current.querySelector('img');
            if (img) {
                if (img.complete) {
                    updateDividerHeight();
                } else {
                    img.onload = updateDividerHeight;
                }
            }
        }
        
        // Update on window resize with debounce
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateDividerHeight();
                // Force ScrollTrigger to recalculate positions
                ScrollTrigger.refresh();
            }, 100);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, [dividerHeight]);
    
    // Setup ScrollTrigger animations
    useLayoutEffect(() => {
        // Clear any existing ScrollTrigger instances first
        clearScrollTriggers();
            
        if (!sectionRef.current || !verifyRef.current || !verifyContainerRef.current || dividerHeight <= 0) {
            return;
        }
        
        // Delay initialization slightly to ensure DOM is ready
        const initTimeout = setTimeout(() => {
                const section = sectionRef.current;
                const verify = verifyRef.current;
            const verifyContainer = verifyContainerRef.current;
                
            // Set initial position of the Verify component
                gsap.set(verify, { 
                y: '-17%',
            });
            
            // Apply padding to container based on divider height
            gsap.set(verifyContainer, {
                paddingTop: dividerHeight * 0.8,
            });
            
            // Create scroll-based animation
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    invalidateOnRefresh: true, // Recalculate on resize
                    onRefresh: (self) => {
                        // Update positions when ScrollTrigger refreshes
                        if (dividerRef.current && verifyContainerRef.current) {
                            gsap.set(verifyContainerRef.current, {
                                paddingTop: dividerRef.current.offsetHeight * 0.8,
                            });
                        }
                    }
                }
                });
                
            // Add the ScrollTrigger to our ref for cleanup
            if (scrollTl.scrollTrigger) {
                scrollTriggersRef.current.push(scrollTl.scrollTrigger);
            }
            
            // Use matchMedia for responsive animations
            ScrollTrigger.matchMedia({
                // Apply different animations based on screen width
                "(min-width: 768px)": function() {
                    // Desktop animation
                    const desktopTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: verifyContainer,
                            start: "top bottom",
                            end: "bottom bottom",
                            scrub: 0.5,
                        }
                    });
                    
                    desktopTl.to(verify, {
                        y: '-5%',
                        ease: "power1.out",
                        duration: 1
                    });
                    
                    if (desktopTl.scrollTrigger) {
                        scrollTriggersRef.current.push(desktopTl.scrollTrigger);
                    }
                },
                
                "(max-width: 767px)": function() {
                    // Mobile animation - simpler to be more performant
                    const mobileTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: verifyContainer,
                            start: "top bottom",
                            end: "center bottom",
                            scrub: 0.5,
                        }
                    });
                    
                    mobileTl.to(verify, {
                        y: '-5%',
                        ease: "power1.out",
                        duration: 1
                    });
                    
                    if (mobileTl.scrollTrigger) {
                        scrollTriggersRef.current.push(mobileTl.scrollTrigger);
                    }
                }
            });
            
            // Force a refresh after initialization to ensure accurate positioning
            ScrollTrigger.refresh();
        }, 100); // Short delay to ensure DOM is ready
                
                return () => {
            clearTimeout(initTimeout);
            clearScrollTriggers();
        };
    }, [dividerHeight]); // Re-run when divider height changes
    
    // Ensure cleanup on component unmount
    useEffect(() => {
        return () => {
            clearScrollTriggers();
                };
    }, []);
    
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
                    priority={true} // Load this image with high priority
                    />
                </div>
            
            {/* Container for Verify with overflow hidden */}
            <div 
                ref={verifyContainerRef} 
                className="relative overflow-hidden"
                style={{ marginTop: `-${dividerHeight * 0.9}px` }} // Negative margin to allow overlap
            >
                {/* Verify component - This will be revealed */}
                <div id="terminal-section"
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