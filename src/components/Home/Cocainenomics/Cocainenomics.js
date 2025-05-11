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
    
    
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    
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
        const updateDividerHeight = () => {
            if (!dividerRef.current) return;
            
            const height = dividerRef.current.offsetHeight;
            if (height > 0 && height !== dividerHeight) {
                setDividerHeight(height);
            }
        };
        
        
        updateDividerHeight();
        
        
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
        
        
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateDividerHeight();
               
                ScrollTrigger.refresh();
            }, 100);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
        };
    }, [dividerHeight]);
    
    
    useLayoutEffect(() => {
       
        clearScrollTriggers();
            
        if (!sectionRef.current || !verifyRef.current || !verifyContainerRef.current || dividerHeight <= 0) {
            return;
        }
        
        
        const initTimeout = setTimeout(() => {
                const section = sectionRef.current;
                const verify = verifyRef.current;
            const verifyContainer = verifyContainerRef.current;
                
            
                gsap.set(verify, { 
                y: '-17%',
            });
            
          
            gsap.set(verifyContainer, {
                paddingTop: dividerHeight * 0.8,
            });
            
            
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    invalidateOnRefresh: true,
                    onRefresh: (self) => {
                       
                        if (dividerRef.current && verifyContainerRef.current) {
                            gsap.set(verifyContainerRef.current, {
                                paddingTop: dividerRef.current.offsetHeight * 0.8,
                            });
                        }
                    }
                }
                });
                
            
            if (scrollTl.scrollTrigger) {
                scrollTriggersRef.current.push(scrollTl.scrollTrigger);
            }
            
            
            ScrollTrigger.matchMedia({
                
                "(min-width: 768px)": function() {
                
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
            
           
            ScrollTrigger.refresh();
        }, 100); 
                
                return () => {
            clearTimeout(initTimeout);
            clearScrollTriggers();
        };
    }, [dividerHeight]); 
    
    
    useEffect(() => {
        return () => {
            clearScrollTriggers();
                };
    }, []);
    
    return (
        <div id="cocainenomics" ref={sectionRef} className="bg-black h-full w-full">
            
            <div ref={dividerRef} className="relative w-full z-20 sticky top-0 left-0 right-0">
                    <Image
                        src="/divider/powerwhitedividerbottom.png"
                        alt="Divider"
                        width={0} 
                        height={0} 
                        sizes="100vw" 
                        className="w-full h-auto object-top"
                        quality={100}
                    priority={true} 
                    />
                </div>
            
            
            <div 
                ref={verifyContainerRef} 
                className="relative overflow-hidden"
                style={{ marginTop: `-${dividerHeight * 0.9}px` }} 
            >
                
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