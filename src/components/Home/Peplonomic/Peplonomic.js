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
      description: "TEXT.",
      videoSrc: "/videos/peplodrive.mp4", 
    },
    { 
      id: 2, 
      description: "text",
      videoSrc: "/videos/iampeploescobar.mp4", 
    },
    // Add more slides as needed
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
  
  // Handle video source change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = slides[currentSlideIndex].videoSrc;
      videoRef.current.load(); // Important to load the new source
      videoRef.current.play().catch(error => {
        // Autoplay might be blocked, which is fine. User can click play.
        console.log("Autoplay prevented or failed:", error);
      });
    }
  }, [currentSlideIndex]); // Re-run when slide index changes

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
    <div id="peplonomic" className="bg-white text-black py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Text Reveal Section - Ensure TextReveal itself is responsive */}
        <div className="mb-12 md:mb-16">
          <TextReveal />
        </div>

        {/* Slider Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Content - Text and Controls */}
            <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1">
             
              {/* Slide Counter */}
              <div className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                {currentSlideIndex + 1}/{totalSlides}
              </div>
              
              {/* Slide Description */}
              <div className="mb-6 md:mb-8 font-mono min-h-[100px] md:min-h-[120px]"> {/* Added min-height */} 
                <p className="text-base md:text-lg leading-relaxed">
                  {slides[currentSlideIndex].description}
                </p>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center space-x-3 pt-4">
                <button 
                  onClick={goToPrevSlide}
                  className="border border-black p-2 md:p-3 hover:bg-black hover:text-white transition-colors duration-200"
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={goToNextSlide}
                  className="border border-black p-2 md:p-3 hover:bg-black hover:text-white transition-colors duration-200"
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Right Content - Video */}
            <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
              <div className="rounded-lg overflow-hidden aspect-w-16 aspect-h-9"> {/* Use aspect ratio */} 
                <video
                  ref={videoRef}
                  key={slides[currentSlideIndex].videoSrc} // Add key to force re-render on source change
                  src={slides[currentSlideIndex].videoSrc} 
                  className="w-full h-full object-cover" // Ensure video covers the container
                  controls
                  controlsList="nodownload" // Consider removing for better UX if download needed
                  preload="metadata"
                  playsInline // Important for mobile
                  muted // Often required for autoplay
                  autoPlay // Attempt autoplay
                  onError={(e) => console.error("Video Error:", e)}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 px-0 sm:px-4 md:px-8 lg:px-16 mt-16 md:mt-24 font-sans">
            <div className="w-full md:w-1/3">
                {/* FAQ Title */}
                <div className="inline-block bg-black text-white px-4 py-2 mb-4">
                  <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
                </div>
                <p className="text-base md:text-lg font-medium">FIND QUICK, STRAIGHTFORWARD ANSWERS TO YOUR MOST COMMON QUESTIONS</p>
            </div>
            <div className="w-full md:w-2/3">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`border-b border-black transition-colors duration-300 ease-in-out ${openFAQ === index ? 'bg-black text-white' : 'bg-white text-black'}`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex justify-between items-center w-full text-left py-3 md:py-4 px-4"
                    >
                      <span className="text-base md:text-lg font-medium mr-4">{faq.question}</span>
                      {/* Icon Container */}
                      <div className={`flex-shrink-0 flex items-center justify-center h-6 w-6 md:h-8 md:w-8 border border-black ${openFAQ === index ? 'bg-white' : 'bg-black'}`}>
                        <span className={`text-lg md:text-xl font-bold ${openFAQ === index ? 'text-black' : 'text-white'}`}>
                          {openFAQ === index ? '×' : '+'}
                        </span>
                      </div>
                    </button>
                    {/* Answer Section */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="pb-4 pt-1 px-4 text-sm md:text-base">
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