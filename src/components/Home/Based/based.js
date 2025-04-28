'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import Arcade from '../Arcade';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Based = () => {
    const containerRef = useRef(null);
    const sectionsRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(0);

    // Function to handle resize and set window width
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    
    useEffect(() => {
        // Set initial window width
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
        }
        
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    useEffect(() => {
        // Only set up animations when windowWidth is available
        if (!windowWidth) return;
        
        const container = containerRef.current;
        const sections = sectionsRef.current;
        
        if (!container || !sections) return;
        
        // Kill any existing ScrollTriggers to prevent duplicate animations
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Set up the horizontal scroll animation
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
        
        ScrollTrigger.create({
            trigger: "#one",
            start: "top top",
            endTrigger: "#two",
            end: "top top", // Pin ends when the top of #two hits the top of the viewport
            pin: true,
            pinSpacing: false,
            // markers: process.env.NODE_ENV === 'development' // Uncomment for debugging
        });

        // Add fade-out animation for section one as user scrolls
        const fadeOutTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#one",
                start: "top top", // Start at the top of the viewport
                endTrigger: "#two",
                end: "top 0.01%", // End animation when top of #two is 20% from top of viewport
                scrub: true, // Smooth animation that follows scroll position
            }
        });
        
        // Fade out section one content
        fadeOutTl.to("#one", { opacity: 0, ease: "power2.inOut" });

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (horizontalScrollTween) horizontalScrollTween.kill();
        };
    }, [windowWidth]); // Re-run when window width changes

    return (
        <div className="bg-black h-full w-full">
            {/* Logo Section - Responsive */}
            <div className="flex items-center justify-center pt-10 sm:pt-16 md:pt-20 px-4">
                <Image
                    src="/cartel/basedcartellogo.png"
                    alt="logo"
                    width={800}
                    height={800}
                    className="w-[70%] sm:w-[60%] md:w-[50%] max-w-[800px]"
                    quality={100}
                />
            </div>
            
            {/* Horizontal scrolling container - Fixed height changed to responsive */}
            <div ref={containerRef} className="overflow-hidden h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen relative">
                <div ref={sectionsRef} className="flex w-[200vw] h-full">
                    {/* First panel - original content */}
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
                                {windowWidth > 640 && <br />} {/* Conditional line break based on screen size */}
                                collaborate to bring you the dankest killomemes across base.
                                <br />
                                A union for the people, a bet on the base takeover.<br /><br />
                                Now available on secondary markets.
                            </p>
                        </div>

                        <div className="flex mb-10 justify-center space-x-3 sm:space-x-4 md:space-x-6 items-center py-6 sm:py-8 md:py-10">
                        <a href="https://magiceden.us/collections/base/0x8059ed675c394c7cb0a8302b8572e2792bacb73e" title="Visit Magic Eden" target="_blank" className="transform hover:scale-110 transition duration-300">
                                <Image
                                    src="/logo/magicedenlogo.png"
                                    alt="Magic Eden"
                                    width={100}
                                    height={100}
                                />
                            </a>
                            <a href="" title="Visit " target="_blank" className="transform hover:scale-110 transition duration-300">
                                <Image
                                    src="/logo/opensealogo.png"
                                    alt="X"
                                    width={100}
                                    height={100}
                                />
                            </a>
                        </div>
                    </section>
                    
                    {/* Second panel - full screen image that will be pinned during vertical scroll */}
                    <section id="one" className="panel w-screen h-full flex items-center justify-center">
                        <div className="relative w-[85%] h-[85%] sm:w-[80%] sm:h-[80%] md:w-[75%] md:h-[75%] lg:w-[70%] lg:h-[70%]">
                            <Image
                                src="/cartel/sicardiosnft.png"
                                alt="Sicardios NFT"
                                fill
                                className="object-contain sm:object-cover"
                                quality={100}
                            />
                        </div>
                    </section>
                </div>
            </div>
            
            {/* Vertical scrolling section after horizontal slide */}
            <section id="two" className="panel relative w-full">
                <Image
                    src="/divider/powerwhitedivider.png"
                    alt="Divider"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-top"
                    quality={100}
                />
                <Arcade />
            </section>
            
        </div>
    );
}

export default Based;