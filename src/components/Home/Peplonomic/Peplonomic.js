'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const Peplonomic = () => {
  // Video slider data
  const videos = [
    { 
      id: 1, 
      title: "Peplo Intro",
      src: "https://player.vimeo.com/video/1032925887?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      thumbnail: "/thumbnail/heromovie.png" 
    },
    { 
      id: 2, 
      title: "I am Peplo Escobar",
      src: "https://player.vimeo.com/video/1074748709?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", 
      thumbnail: "/thumbnail/peplo.png"
    },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const sliderRef = useRef(null);
  
  const totalVideos = videos.length;

  // Navigation functions
  const goToNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === totalVideos - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? totalVideos - 1 : prevIndex - 1
    );
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
        
        {/* Video Slider */}
        <div className="mb-16">
          {/* Title with Navigation Controls */}
          <div className="flex items-center justify-center mb-4">
            <button 
              onClick={goToPrevVideo}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-all mr-4"
              aria-label="Previous video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-semibold text-center">
              {videos[currentVideoIndex].title} 
              <span className="text-sm ml-3 bg-black text-white px-2 py-1 rounded-full">
                {currentVideoIndex + 1}/{totalVideos}
              </span>
            </h3>
            
            <button 
              onClick={goToNextVideo}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-all ml-4"
              aria-label="Next video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-2 mt-4 overflow-x-auto py-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setCurrentVideoIndex(index)}
                className={`relative flex-shrink-0 transition-all ${
                  currentVideoIndex === index 
                    ? "ring-2 ring-black scale-105 rounded" 
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image 
                  src={video.thumbnail}
                  alt={video.title}
                  width={100}
                  height={60}
                  className="rounded object-cover w-24 h-14"
                />
                {currentVideoIndex === index && (
                  <div className="absolute inset-0 bg-white bg-opacity-20 pointer-events-none "></div>
                )}
              </button>
            ))}
          </div>
          <div className="relative flex justify-center">
            <div 
              className="relative aspect-video w-1/2 overflow-hidden rounded-xl shadow-lg"
              ref={sliderRef}
            >
              <iframe
                src={videos[currentVideoIndex].src}
                title={videos[currentVideoIndex].title}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
              
              {/* Position Indicator - kept at bottom right */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-bold">
                {currentVideoIndex + 1}/{totalVideos}
              </div>
            </div>
          </div>
          
          
        </div>
        
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 px-4 md:px-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 md:mb-0 font-normal font-fuel-decay">$CRTL</h1>
          <p className="text-lg md:text-xl font-mono ml-4">
            Bridging together the Peplo universe, memes, characters and lore with the utility of AI and DeFi to bring you a whole new crypto sector: MemeFAi
          </p>
        </div>

       
        <Section 
          imageSrc="/peplo-scene.png" 
          text="Peplo's rise from the trenches is a story for the ages. The cartel kingpin went from moving grams to kilomemes."
          imageLeft={true} 
        />
         <Section 
          imageSrc="/peplo-scene.png" 
          text="Peplo's rise from the trenches is a story for the ages. The cartel kingpin went from moving grams to kilomemes."
          imageLeft={false} 
        />
         <Section 
          imageSrc="/peplo-scene.png" 
          text="Peplo's rise from the trenches is a story for the ages. The cartel kingpin went from moving grams to kilomemes."
          imageLeft={true} 
        />

        
        <div className="text-center my-16 md:my-24 px-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">What is MemeFAi?</h2>
          
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