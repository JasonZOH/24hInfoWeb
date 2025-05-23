import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Flame, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store';

const sections = [
  { id: 'prologue', name: 'Prologue' },
  { id: 'lugdunum', name: 'Lugdunum' },
  { id: 'renaissance', name: 'Renaissance' },
  { id: 'freres', name: 'Frères Lumière' },
  { id: 'streets', name: 'Rues de Lumière' },
  { id: 'fete', name: 'Fête des Lumières' },
  { id: 'futur', name: 'Futur Lumineux' },
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentSection, audioEnabled, toggleAudio } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sectionElement = document.querySelectorAll('.section')[index];
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-gold h-7 w-7" />
            <h1 className="text-2xl font-serif font-bold text-light">
              <span className="text-gold">LY</span>UMEN
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`text-sm uppercase tracking-wider font-sans transition-colors ${
                  currentSection === index ? 'text-gold' : 'text-light/70 hover:text-light'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleAudio} 
              className="p-2 rounded-full hover:bg-light/10 transition-colors"
              aria-label={audioEnabled ? 'Mute audio' : 'Enable audio'}
            >
              {audioEnabled ? (
                <Volume2 className="h-5 w-5 text-gold" />
              ) : (
                <VolumeX className="h-5 w-5 text-light/70" />
              )}
            </button>

            <button
              className="block md:hidden p-2 rounded-full hover:bg-light/10 transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-light" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-0 bg-dark/95 backdrop-blur-lg z-50 md:hidden"
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <Flame className="text-gold h-6 w-6" />
              <h2 className="text-xl font-serif font-bold text-light">
                <span className="text-gold">LY</span>UMEN
              </h2>
            </div>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6 text-light" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`text-xl py-2 font-serif transition-colors ${
                  currentSection === index ? 'text-gold' : 'text-light/70 hover:text-light'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;