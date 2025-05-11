'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Image from 'next/image'
import Arcade from '../Arcade';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


if (typeof window !== 'undefined') {
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const Based = () => {
    const containerRef = useRef(null);
    const sectionsRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(0);
    const scrollTriggersRef = useRef([]);
    const tweensRef = useRef([]);

    
    const clearAnimations = () => {
        
        if (scrollTriggersRef.current.length) {
            scrollTriggersRef.current.forEach(trigger => {
                if (trigger && trigger.kill) {
                    trigger.kill();
                }
            });
            scrollTriggersRef.current = [];
        }
        
        
        if (tweensRef.current.length) {
            tweensRef.current.forEach(tween => {
                if (tween && tween.kill) {
                    tween.kill();
                }
            });
            tweensRef.current = [];
        }
    };

   
    const handleResize = () => {
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
        }
    };
    
    
    useEffect(() => {
       
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            
            
            let resizeTimer;
            const handleResizeWithDebounce = () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    handleResize();
                    
                    ScrollTrigger.refresh(true);
                }, 100);
            };
            
            window.addEventListener('resize', handleResizeWithDebounce);
            
            return () => {
                window.removeEventListener('resize', handleResizeWithDebounce);
                clearTimeout(resizeTimer);
            };
        }
    }, []);

    
    useLayoutEffect(() => {
      
        if (!windowWidth) return;
        
        
        clearAnimations();
        
        if (!containerRef.current || !sectionsRef.current) return;
        
        
        const initTimeout = setTimeout(() => {
            const container = containerRef.current;
            const sections = sectionsRef.current;
            
            
            let horizontalScrollTween = gsap.to(sections, {
                x: () => -(sections.offsetWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${sections.offsetWidth - window.innerWidth}`,
                    pin: true,
                    scrub: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    id: "horizontalScroll"
                }
            });
            
            
            tweensRef.current.push(horizontalScrollTween);
            if (horizontalScrollTween.scrollTrigger) {
                scrollTriggersRef.current.push(horizontalScrollTween.scrollTrigger);
            }
            
           
            const pinTrigger = ScrollTrigger.create({
            trigger: "#one",
            start: "top top",
            endTrigger: "#two",
                end: "top top",
            pin: true,
            pinSpacing: false,
                id: "pinOne"
            });
            
            scrollTriggersRef.current.push(pinTrigger);
            
            
            const fadeOutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#one",
                    start: "top top",
                    endTrigger: "#two",
                    end: "top 0.01%",
                    scrub: true,
                    id: "fadeOut"
                }
            });
            
          
            fadeOutTl.to("#one", { opacity: 0, ease: "power2.inOut" });
            
            
            if (fadeOutTl.scrollTrigger) {
                scrollTriggersRef.current.push(fadeOutTl.scrollTrigger);
            }
            
            
            ScrollTrigger.refresh();
        }, 100);
        
      
        return () => {
            clearTimeout(initTimeout);
            clearAnimations();
        };
    }, [windowWidth]); 
    
    
    useEffect(() => {
        return () => {
            clearAnimations();
        };
    }, []);

    return (
        <div className="bg-black h-full w-full" id='based' >
           
            <div className="flex items-center justify-center pt-10 sm:pt-16 md:pt-20 px-4">
                    <Image
                        src="/cartel/basedcartellogo.png"
                        alt="logo"
                        width={800}
                        height={800}
                    className="w-[70%] sm:w-[60%] md:w-[50%] max-w-[800px]"
                        quality={100}
                    priority={true}
                    />
                </div>
            
            
            <div ref={containerRef} className="overflow-hidden h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen relative">
                <div ref={sectionsRef} className="flex w-[200vw] h-full">
                   
                    <section className="w-screen h-full flex flex-col items-center justify-center px-4">
                        <div className="flex items-center justify-center p-4 sm:p-6 md:p-10">
                            <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw]">
                        <Image
                            src="/cartel/NFTs.png"
                            alt="NFTs"
                            width={900}
                            height={800}
                                    className="w-full h-auto object-contain"
                            unoptimized
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center px-4">
                            <p className="text-white text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw]">
                                Join the unstoppable movement of the cartel, where the best onchain innovators
                                {windowWidth > 640 && <br />} 
                        collaborate to bring you the dankest killomemes across base.
                                <br />
                                A union for the people, a bet on the base takeover.<br /><br />
                        Now available on secondary markets.
                    </p>
                </div>

                        <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-6 items-center mb-20 py-6 sm:py-8 md:py-10">
                    <a href="https://magiceden.us/collections/base/0x8059ed675c394c7cb0a8302b8572e2792bacb73e" title="Visit Magic Eden" target="_blank" className="transform hover:scale-110 transition duration-300">
                        <Image
                            src="/logo/magicedenlogo.png"
                            alt="Magic Eden"
                            width={100}
                            height={100}
                                    className="w-full h-full "
                        />
                    </a>
                </div>
            </section>

                    
                    <section id="one" className="panel w-screen h-full flex items-center justify-center">
                        <div className="relative w-[85%] h-[85%] sm:w-[80%] sm:h-[80%] md:w-[75%] md:h-[75%] lg:w-[70%] lg:h-[70%]">
                            <Image
                                src="/cartel/sicardiosnft.png"
                                alt="Sicardios NFT"
                                fill
                                className="object-contain sm:object-cover"
                                quality={100}
                                priority={true}
                            />
                        </div>
                    </section>
                </div>
            </div>
            
            
            <section id="two" className="panel relative w-full">
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
                <Arcade />
            </section>
            
        </div>
    );
}

export default Based;