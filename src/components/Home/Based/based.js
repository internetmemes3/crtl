'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image'
import Arcade from '../Arcade';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Based = () => {
    const containerRef = useRef(null);
    const sectionsRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const sections = sectionsRef.current;
        
        if (!container || !sections) return;
        
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
            horizontalScrollTween.kill();
        };
    }, []);

    return (
        <div className="bg-black h-full w-full">
            <div className="flex items-center justify-center mt-20">
                <Image
                    src="/cartel/basedcartellogo.png"
                    alt="logo"
                    width={800}
                    height={800}
                    quality={100}
                />
            </div>
            
            {/* Horizontal scrolling container */}
            <div ref={containerRef} className="overflow-hidden h-screen relative">
                <div ref={sectionsRef} className="flex w-[200vw] h-full">
                    {/* First panel - original content */}
                    <section className="w-screen h-full flex flex-col items-center justify-center px-4">
                        <div className="flex items-center justify-center p-10">
                            <div>
                                <Image
                                    src="/cartel/NFTs.png"
                                    alt="NFTs"
                                    width={900}
                                    height={800}
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center px-4">
                            <p className="text-white text-center text-1xl font-bold">
                                Join the unstoppable movement of the cartel, where the best onchain innovators <br/>
                                collaborate to bring you the dankest killomemes across base.
                                <br/>
                                A union for the people, a bet on the base takeover.<br/><br/>
                                Now available on secondary markets.
                            </p>
                        </div>

                        <div className="flex justify-center space-x-4 sm:space-x-6 items-center py-10">
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
                        <div className="relative w-full h-full">
                            <Image
                                src="/cartel/sicardiosnft.png"
                                alt="Sicardios NFT"
                                fill
                                className="object-cover"
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