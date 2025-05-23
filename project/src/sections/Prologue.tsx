import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Prologue: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current && textRef.current && beamRef.current) {
      // Initialize light beam animation
      gsap.fromTo(beamRef.current, 
        { 
          opacity: 0, 
          width: 0,
          height: 0,
        },
        { 
          opacity: 0.6, 
          width: '150vw',
          height: '80vh',
          duration: 3,
          ease: 'power2.out',
          delay: 1
        }
      );
      
      // Text reveal animation
      const splitText = new SplitText(textRef.current, { type: "words,chars" });
      gsap.from(splitText.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.02,
        duration: 1.5,
        ease: "power4.out",
        delay: 1.5
      });
      
      // Scroll-triggered animations
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: -100,
        opacity: 0,
        ease: "power2.inOut"
      });
      
      gsap.to(beamRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true
        },
        opacity: 1,
        width: '200vw',
        ease: "power2.inOut"
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} id="prologue" className="section bg-dark relative overflow-hidden">
      <div 
        ref={beamRef}
        className="light-beam absolute left-1/2 bottom-0 origin-bottom-left"
      />
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          ref={textRef}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-8 text-gold">LYUMEN</h1>
          <p className="text-xl md:text-2xl italic mb-12 text-light/90">
            « Lyon, ville née de la lumière... et des ténèbres. »
          </p>
          <p className="text-lg opacity-70 mb-16">
            Un voyage lumineux à travers l'histoire et l'âme de Lyon.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="inline-block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center"
            >
              <p className="text-sm uppercase tracking-wider mb-2">Défilez pour commencer</p>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="gradient-overlay" />
    </section>
  );
};

// Mock SplitText since we don't have the actual GSAP plugin in this environment
class SplitText {
  chars: HTMLElement[];
  
  constructor(element: HTMLElement, options: { type: string }) {
    // In a real implementation, this would split the text
    // Here we're just returning the element as an array
    this.chars = [element];
  }
}

export default Prologue;