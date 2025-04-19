'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import TextReveal from './TextReveal'
import './TextReveal.css'
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
      title: "Peplo Intro",
      description: "text.",
      videoSrc: "/videos/peplodrive.mp4", 
      poster: "/thumbnail/heromovie.png"
    },
    { 
      id: 2, 
      title: "I am Peplo Escobar",
      description: "text.",
      videoSrc: "/videos/iampeploescobar.mp4", 
      poster: "/thumbnail/peplo.png"
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

  const Section = ({ imageSrc, text, imageLeft = true }) => (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 px-4 md:px-16 ${imageLeft ? '' : 'md:flex-row-reverse'}`}>
      <div className="w-full md:w-1/2">
        <Image src={imageSrc} alt="Peplo Scene" width={600} height={400} className="rounded-lg object-cover" />
      </div>
      <div className="w-full md:w-1/2">
        <p className="text-black text-lg md:text-xl font-mono">{text}</p>
      </div>
    </div>
  );

  return (
    <div id="peplonomic" className="bg-white text-black py-16 font-mono">
      <div className="container mx-auto px-4 md:px-8">
        <TextReveal />
        
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-8">
            
            <div className="w-full md:w-1/2 flex flex-col">
             
              <div className="text-4xl font-bold mb-8">
                {currentSlideIndex + 1}/{totalSlides}
              </div>
              
              
              <div className="mb-8 font-mono">
                <h3 className="text-2xl font-semibold mb-4">
                  {slides[currentSlideIndex].title}
                </h3>
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
                  poster={slides[currentSlideIndex].poster}
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
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 px-4 md:px-16">
            <div className="w-full md:w-1/3">
                <h2 className="text-5xl font-bold mb-4">FAQ</h2>
                <p className="text-lg">FIND QUICK, STRAIGHTFORWARD ANSWERS TO YOUR MOST COMMON QUESTIONS</p>
            </div>
            <div className="w-full md:w-2/3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 py-4">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex justify-between items-center w-full text-left text-xl font-medium"
                    >
                      <span>{faq.question}</span>
                      <span>{openFAQ === index ? '-' : '+'}</span>
                    </button>
                    {openFAQ === index && (
                      <div className={`mt-3 text-gray-600 p-4 rounded ${openFAQ === index ? 'bg-black text-white' : ''}`}>
                        {faq.answer}
                         <button 
                            onClick={() => toggleFAQ(index)} 
                            className="float-right text-xl font-bold"
                          >
                            x
                         </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Peplonomic;