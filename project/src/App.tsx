import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LampFloor } from 'lucide-react';

import Prologue from './sections/Prologue';
import Lugdunum from './sections/Lugdunum';
import Renaissance from './sections/Renaissance';
import FreresLumiere from './sections/FreresLumiere';
import StreetsOfLight from './sections/StreetsOfLight';
import FeteDeLumiere from './sections/FeteDeLumiere';
import FuturOfLyon from './sections/FuturOfLyon';
import Navigation from './components/Navigation';
import AudioControl from './components/AudioControl';
import { useStore } from './store';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentSection, setCurrentSection, audioEnabled } = useStore();
  
  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top + scrollPosition - windowHeight / 2;
        
        if (scrollPosition >= sectionTop) {
          setCurrentSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setCurrentSection]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <LampFloor size={64} className="text-gold animate-pulse" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl font-serif mb-6 text-gold"
        >
          LYUMEN
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ duration: 2, delay: 0.8 }}
          className="h-1 bg-gradient-to-r from-primary via-gold to-secondary rounded-full"
        />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="lyumen-app">
        <Navigation />
        {audioEnabled && <AudioControl />}
        
        <div className="sections-container">
          <Prologue />
          <Lugdunum />
          <Renaissance />
          <FreresLumiere />
          <StreetsOfLight />
          <FeteDeLumiere />
          <FuturOfLyon />
        </div>
      </div>
    </AnimatePresence>
  );
}

export default App;