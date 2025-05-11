"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import Image from 'next/image'

const Navbar = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Set up resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'About', to: 'text-reveal-wrapper' },
    { name: 'FAQ', to: 'peplonomic-faq' },
    { name: 'Terminal', to: 'terminal-section' },
    { name: 'NFTs', to: 'based' },
  ];

  return (
    <>
      <div className="w-full flex justify-center mt-2 font-mono fixed top-0 z-50">
        <nav className="flex items-center justify-between bg-[#1C1C1C] text-white p-2 px-4 rounded-full shadow-lg md:space-x-6 w-[90%] md:w-auto">
          <div className="flex-shrink-0">
            <Image 
              src="/logo.png"
              alt="logo"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.to} 
                  spy={true} 
                  smooth={true} 
                  offset={-70}
                  duration={500} 
                  className="cursor-pointer hover:text-gray-400 uppercase text-sm tracking-wider"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {/*
          <button 
            onClick={() => setShowIframe(true)}
            className="hidden md:block bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-full uppercase text-sm tracking-wider"
          >
            Buy Now
          </button>
          */}
          {/* Hamburger Menu Button - Mobile Only */}
          <button 
            className="md:hidden flex flex-col space-y-1.5 p-2 z-50" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </nav>

        {/* Mobile Menu - Slide Down */}
        <div 
          className={`fixed top-0 left-0 right-0 bg-[#1C1C1C] pt-20 pb-6 px-6 shadow-lg transition-transform duration-300 ease-in-out z-40 ${
            isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'
          }`}
        >
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name} className="border-b border-gray-700 pb-2">
                <Link 
                  to={item.to} 
                  spy={true} 
                  smooth={true} 
                  offset={-70}
                  duration={500} 
                  className="block py-2 text-white hover:text-gray-400 uppercase text-sm tracking-wider"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
               {/*
              <button 
                onClick={() => {
                  setShowIframe(true);
                  closeMenu();
                }}
                className="w-full bg-gray-600 hover:bg-gray-500 text-white px-5 py-3 rounded-full uppercase text-sm tracking-wider"
              >
                Buy Now
              </button>
              */}
            </li>
          </ul>
        </div>
      </div>

      {/* Prevent scrolling when mobile menu is open */}
      {isMenuOpen && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}

      {showIframe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="relative bg-white p-4 rounded-lg">
            <button 
              onClick={() => setShowIframe(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <iframe
              width="400"
              height="720"
              style={{ border: 0 }}
              allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
              src="https://flooz.xyz/embed/trade?swapDisabled=true&swapNetwork=eth&swapLockToToken=false&onRampDisabled=false&onRampNetwork=base&onRampAsDefault=false&onRampTokenAddress=0xe9f67c8fcc54b307a95bf881736916f70180ee77&onRampLockToken=true&network=eth&lightMode=true&backgroundColor=transparent&miniappIntent=swap"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
