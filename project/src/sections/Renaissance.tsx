import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import printingPressAnimation from '../assets/printing-press-animation.json';

gsap.registerPlugin(ScrollTrigger);

const Renaissance: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const [userText, setUserText] = useState('LUMIÈRE');
  const [isPrinting, setIsPrinting] = useState(false);
  
  useEffect(() => {
    if (sectionRef.current && textRef.current && lettersRef.current) {
      // Floating letters animation
      const letters = lettersRef.current.querySelectorAll('.letter');
      letters.forEach((letter, index) => {
        gsap.to(letter, {
          y: "random(-20, 20)",
          x: "random(-10, 10)",
          rotation: "random(-15, 15)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        });
      });
      
      // Scroll animations
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      gsap.fromTo(lettersRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit to 10 characters
    if (e.target.value.length <= 10) {
      setUserText(e.target.value.toUpperCase());
    }
  };
  
  const handlePrint = () => {
    setIsPrinting(true);
    // Simulate printing process
    setTimeout(() => setIsPrinting(false), 3000);
  };
  
  // Random transformation for floating letter effect
  const getRandomTransform = () => {
    const rotate = Math.random() * 20 - 10;
    return `rotate(${rotate}deg)`;
  };
  
  return (
    <section ref={sectionRef} id="renaissance" className="section bg-secondary/10 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div ref={textRef} className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif mb-6 text-center"
            >
              Renaissance & <span className="text-gold">Imprimerie</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg mb-4 text-center text-light/90"
            >
              Au XVIe siècle, Lyon devient une capitale européenne de l'imprimerie, diffusant la lumière du savoir à travers le continent.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px]">
              <Lottie 
                animationData={printingPressAnimation} 
                loop={isPrinting}
                className="w-full h-full"
              />
              
              {/* Letters floating out of the press */}
              <div 
                ref={lettersRef} 
                className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
              >
                {isPrinting && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char, index) => (
                  <div 
                    key={index}
                    className="letter absolute text-2xl md:text-3xl font-serif font-bold opacity-70"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      color: Math.random() > 0.5 ? '#c9a758' : '#f8f7f4',
                      transform: getRandomTransform(),
                      transitionDelay: `${index * 0.1}s`
                    }}
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-dark/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20"
              >
                <h3 className="text-xl font-serif text-gold mb-4">Imprimez votre texte</h3>
                <p className="mb-4 text-light/80">
                  Comme les imprimeurs lyonnais de la Renaissance, créez votre propre typographie. Entrez votre texte et lancez la presse!
                </p>
                
                <div className="mb-6">
                  <label htmlFor="print-text" className="block text-sm mb-2">
                    Votre texte:
                  </label>
                  <input
                    id="print-text"
                    type="text"
                    value={userText}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-dark/50 border border-light/20 rounded text-light focus:border-gold/50 focus:outline-none"
                    maxLength={10}
                  />
                </div>
                
                <button 
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className={`w-full py-3 rounded-lg font-serif text-lg transition-colors ${
                    isPrinting 
                      ? 'bg-gold/50 cursor-not-allowed' 
                      : 'bg-gold hover:bg-gold/80 text-dark'
                  }`}
                >
                  {isPrinting ? 'Impression en cours...' : 'Imprimer'}
                </button>
              </motion.div>
              
              {/* Printed result */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isPrinting || userText ? 1 : 0, y: isPrinting || userText ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-8 bg-light/10 backdrop-blur-sm rounded-lg border border-gold/20"
              >
                <div className="relative flex justify-center items-center min-h-[100px]">
                  {isPrinting ? (
                    <div className="animate-pulse text-xl text-gold/70">Impression en cours...</div>
                  ) : (
                    <div className="font-serif text-4xl md:text-5xl tracking-wider text-gold">
                      {userText}
                    </div>
                  )}
                  
                  {/* Ink splatters */}
                  {!isPrinting && userText && (
                    <>
                      <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-gold/10 blur-sm" />
                      <div className="absolute bottom-1/3 right-1/3 w-4 h-4 rounded-full bg-gold/10 blur-sm" />
                      <div className="absolute top-1/2 right-1/4 w-5 h-5 rounded-full bg-gold/10 blur-sm" />
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="gradient-overlay" />
    </section>
  );
};

export default Renaissance;