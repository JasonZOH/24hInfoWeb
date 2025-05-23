import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FreresLumiere: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectorRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filmPosition, setFilmPosition] = useState(0);
  
  const filmFrames = [
    "Une foule d'ouvriers sortant des usines Lumière",
    "Un jardinier arrosé par son propre tuyau",
    "Le repas d'un bébé avec ses parents",
    "L'arrivée d'un train en gare"
  ];
  
  useEffect(() => {
    if (sectionRef.current && projectorRef.current && screenRef.current) {
      // Projector light beam animation
      gsap.fromTo(projectorRef.current.querySelector('.light-beam'),
        { 
          opacity: 0,
          width: 0
        },
        {
          opacity: 0.5,
          width: '100%',
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: true
          }
        }
      );
      
      // Screen reveal animation
      gsap.fromTo(screenRef.current,
        { 
          opacity: 0,
          scale: 0.9
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  // Handle wheel event to "scroll" through the film
  const handleWheel = (e: React.WheelEvent) => {
    if (isPlaying) {
      // Calculate new position with boundary checks
      const newPosition = Math.max(0, Math.min(filmPosition + Math.sign(e.deltaY) * 0.1, filmFrames.length - 1));
      setFilmPosition(newPosition);
    }
  };
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setFilmPosition(0);
    }
  };
  
  // Calculate which frame to show
  const currentFrame = Math.floor(filmPosition);
  const nextFrame = Math.min(currentFrame + 1, filmFrames.length - 1);
  const frameOpacity = 1 - (filmPosition - currentFrame);
  
  return (
    <section 
      ref={sectionRef} 
      id="freres" 
      className="section bg-dark relative overflow-hidden"
      onWheel={handleWheel}
    >
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Les Frères <span className="text-gold">Lumière</span>
            </h2>
            
            <p className="text-lg mb-6 text-light/90">
              « Ici, la lumière a commencé à bouger. »
            </p>
            
            <p className="mb-8 text-light/70">
              En 1895, Auguste et Louis Lumière projettent pour la première fois des images en mouvement. 
              Lyon devient le berceau du cinématographe, nouvel art de la lumière en mouvement.
            </p>
            
            <div className="mb-8 p-6 bg-dark/60 backdrop-blur-sm rounded-lg border border-gold/20">
              <h3 className="text-xl font-serif text-gold mb-4">Instructions</h3>
              <p className="mb-4 text-light/80">
                {isPlaying 
                  ? "Utilisez votre molette pour faire défiler le film et revivre l'histoire du cinéma!" 
                  : "Cliquez sur 'Lancer la projection' pour commencer l'expérience."
                }
              </p>
              
              <button 
                onClick={togglePlayback}
                className={`py-3 px-6 rounded-lg font-serif transition-colors ${
                  isPlaying 
                    ? 'bg-light/20 hover:bg-light/30 text-light' 
                    : 'bg-gold hover:bg-gold/80 text-dark'
                }`}
              >
                {isPlaying ? 'Arrêter la projection' : 'Lancer la projection'}
              </button>
            </div>
          </motion.div>
          
          <div className="relative">
            {/* Film projector */}
            <div 
              ref={projectorRef}
              className="projector-container relative h-80 mb-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="projector absolute left-1/2 top-0 transform -translate-x-1/2 w-28 h-20 bg-gray-800 rounded-lg"
              >
                <div className="lens absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <div className="inner-lens w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                
                {/* Reels */}
                <div className="reel absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-700 rounded-full border-4 border-gray-600"></div>
                <div className="reel absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-700 rounded-full border-4 border-gray-600"></div>
                
                {/* Light beam */}
                <div className="light-beam absolute left-1/2 top-full transform -translate-x-1/2 w-0 h-64 bg-gradient-to-b from-gold/50 to-transparent" style={{
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                }}></div>
              </motion.div>
            </div>
            
            {/* Screen */}
            <motion.div 
              ref={screenRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="screen relative bg-light/90 aspect-video max-w-md mx-auto rounded-sm overflow-hidden"
            >
              {isPlaying ? (
                <div ref={filmRef} className="film relative w-full h-full">
                  {/* Current frame */}
                  <div 
                    className="frame absolute inset-0 flex items-center justify-center p-4 text-center"
                    style={{ opacity: frameOpacity }}
                  >
                    <p className="text-dark font-serif text-lg">{filmFrames[currentFrame]}</p>
                  </div>
                  
                  {/* Next frame */}
                  <div 
                    className="frame absolute inset-0 flex items-center justify-center p-4 text-center"
                    style={{ opacity: 1 - frameOpacity }}
                  >
                    <p className="text-dark font-serif text-lg">{filmFrames[nextFrame]}</p>
                  </div>
                  
                  {/* Film grain overlay */}
                  <div className="grain absolute inset-0 bg-black opacity-10"></div>
                  
                  {/* Film frame lines */}
                  <div className="frame-lines absolute top-0 left-0 w-full h-2 bg-black opacity-20"></div>
                  <div className="frame-lines absolute bottom-0 left-0 w-full h-2 bg-black opacity-20"></div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-dark font-serif italic">En attente de projection...</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="gradient-overlay" />
    </section>
  );
};

export default FreresLumiere;