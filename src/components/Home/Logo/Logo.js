'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo = () => {
    // Define logos data to make the code more maintainable
    const logos = [
        {
            href: "https://coinmarketcap.com/currencies/peplo-escobar/",
            src: "/logo/coinmarketcap-logo.png",
            alt: "coinmarketcap",
            width: 300,
            height: 200,
        },
        {
            href: "https://dexscreener.com/base/0x5e5344baF5fBCac1269C7f860500198052B4E4D0",
            src: "/logo/dexscreener.png",
            alt: "dexscreener",
            width: 250,
            height: 150,
        },
        {
            href: "https://www.dextools.io/app/en/base/pair-explorer/0x5e5344baf5fbcac1269c7f860500198052b4e4d0?t=1731545032991",
            src: "/logo/dextools.png",
            alt: "dextools",
            width: 200,
            height: 100,
        },
        {
            href: "https://app.uniswap.org/explore/tokens/base/0xe9f67c8fcc54b307a95bf881736916f70180ee77",
            src: "/logo/Uniswap-Logo-PNG.png",
            alt: "Uniswap",
            width: 200,
            height: 100,
        },
        {
            href: "https://flooz.xyz/basedpeplo",
            src: "/logo/flooz-full-black.png",
            alt: "flooz",
            width: 200,
            height: 100,
        },
        {
            href: "https://www.okx.com/ul/okPNL7e",
            src: "/logo/OKX.png",
            alt: "OKX",
            width: 100,
            height: 50,
        },
    ];

    // Clone logos to create a seamless scrolling effect
    const logosForScroll = [...logos, ...logos];

    return (
        <div className="bg-white py-8 overflow-hidden relative">
            {/* Left fade mask */}
            <div className="absolute left-0 top-0 w-32 h-full z-10 bg-gradient-to-r from-white to-transparent"></div>
            
            {/* Right fade mask */}
            <div className="absolute right-0 top-0 w-32 h-full z-10 bg-gradient-to-l from-white to-transparent"></div>
            
            {/* Scrolling carousel */}
            <div className="logo-carousel-container">
                <div className="logo-carousel">
                    {logosForScroll.map((logo, index) => (
                        <a 
                            key={`${logo.alt}-${index}`} 
                            href={logo.href} 
                            title={`Visit ${logo.alt}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="logo-item mx-8 transform hover:scale-110 transition duration-300"
                        >
<Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width} 
                                height={logo.height}
        className="object-contain" 
      />
      </a>
                    ))}
                </div>
      </div>
            
            <style jsx>{`
                .logo-carousel-container {
                    overflow: hidden;
                    width: 100%;
                    position: relative;
                }
                
                .logo-carousel {
                    display: flex;
                    align-items: center;
                    animation: scroll 40s linear infinite;
                    width: max-content;
                }
                
                .logo-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}

export default Logo;