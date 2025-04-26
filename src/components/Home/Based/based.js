'use client'

import { useEffect } from 'react';
import Image from 'next/image'
import Arcade from '../Arcade';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Based = () => {
    useEffect(() => {
        // Pin section one until section two reaches the top
        ScrollTrigger.create({
            trigger: "#one",
            start: "top top",
            endTrigger: "#two",
            end: "top top", // Pin ends when the top of #two hits the top of the viewport
            pin: true,
            pinSpacing: false,
            // markers: process.env.NODE_ENV === 'development' // Uncomment for debugging
        });

        // Cleanup function for ScrollTrigger instances
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div id="based" className="bg-black h-full w-full">
            
                <div className="flex items-center justify-center mt-20">
                    <Image
                        src="/cartel/basedcartellogo.png"
                        alt="logo"
                        width={800}
                        height={800}
                        quality={100}
                    />
                </div>
                <section id="one" className="panel">
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