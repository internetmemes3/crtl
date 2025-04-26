'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import TextReveal from './TextReveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Peplonomic = () => {
  // Register ScrollTrigger with GSAP
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  const slides = [
    { 
      id: 1, 
      description: "text.",
      videoSrc: "/videos/peplodrive.mp4", 
    },
    { 
      id: 2, 
      description: "text.",
      videoSrc: "/videos/iampeploescobar.mp4", 
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const videoRef = useRef(null);
  
  const totalSlides = slides.length;

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };
  

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  };

  const faqs = [
    { question: "How do I use the $CRTL Swarm?", answer: "Project timelines vary, but most are completed within 2-6 weeks, depending on complexity." },
    { question: "Do you offer custom solutions?", answer: "Yes, contact us for more details." },
    { question: "What industries do you work with?", answer: "We work across various industries in the AI and DeFi space." },
    { question: "What is your pricing model?", answer: "Our pricing is project-based. Please reach out for a quote." },
  ];

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

    return (
    <div id="peplonomic" className="bg-white text-black py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div>
        <TextReveal />
        </div>

        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-8">
            
            <div className="w-full md:w-1/2 flex flex-col">
             
              <div className="text-4xl font-bold mb-8">
                {currentSlideIndex + 1}/{totalSlides}
              </div>
              
              
              <div className="mb-8 font-mono">
                <p className="text-lg leading-relaxed">
                  {slides[currentSlideIndex].description}
                </p>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center space-x-2 pt-4">
                <button 
                  onClick={goToPrevSlide}
                  className="border border-black p-3 hover:bg-black hover:text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={goToNextSlide}
                  className="border border-black p-3 hover:bg-black hover:text-white transition-colors"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Right Content - Video */}
            <div className="w-full md:w-1/2 relative">
              <div className="rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={slides[currentSlideIndex].videoSrc}
                  className="w-full h-auto object-cover"
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                  playsInline
                  onCanPlay={handlePlay}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 px-4 md:px-16 mt-16 md:mt-24 font-sans">
            <div className="w-full md:w-1/3">
                {/* FAQ Title with Black Background */}
                <div className="inline-block bg-black text-white px-4 py-2 mb-4">
                  <h2 className="text-4xl font-bold">FAQ</h2>
                </div>
                <p className="text-lg font-medium">FIND QUICK, STRAIGHTFORWARD ANSWERS TO YOUR MOST COMMON QUESTIONS</p>
            </div>
            <div className="w-full md:w-2/3">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`border-b border-black transition-colors duration-300 ease-in-out ${openFAQ === index ? 'bg-black text-white' : 'bg-white text-black'}`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex justify-between items-center w-full text-left py-4"
                    >
                      <span className="text-lg font-medium px-4">{faq.question}</span>
                      {/* Icon Container */}
                      <div className={`flex items-center justify-center h-8 w-8 border border-black ${openFAQ === index ? 'bg-white' : 'bg-black'} mr-4`}>
                        <span className={`text-xl font-bold ${openFAQ === index ? 'text-black' : 'text-white'}`}>
                          {openFAQ === index ? '×' : '+'}
                        </span>
                      </div>
                    </button>
                    {/* Answer Section - Using GSAP or Framer Motion for smooth animation is recommended for production */}
                    <div 
                      className={`overflow-hidden transition-max-height duration-500 ease-in-out ${openFAQ === index ? 'max-h-screen' : 'max-h-0'}`}
                    >
                      <div className="pb-4 px-4 text-base">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Peplonomic;