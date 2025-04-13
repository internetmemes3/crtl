'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'



const Peplonomic = () => {
 
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