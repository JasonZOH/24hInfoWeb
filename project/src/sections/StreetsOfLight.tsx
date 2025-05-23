import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Moon, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Building {
  id: number;
  name: string;
  description: string;
  position: { x: number; y: number };
  width: number;
  height: number;
}

const StreetsOfLight: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const [activeBuilding, setActiveBuilding] = useState<number | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('sunset');
  
  const buildings: Building[] = [
    {
      id: 1,
      name: "Hôtel de Ville",
      description: "Illuminé depuis 1989, c'est un symbole du savoir-faire lyonnais en matière de mise en lumière architecturale.",
      position: { x: 25, y: 60 },
      width: 30,
      height: 40
    },
    {
      id: 2,
      name: "Opéra de Lyon",
      description: "Rénové par Jean Nouvel, son éclairage met en valeur sa silhouette contemporaine qui dialogue avec le bâtiment historique.",
      position: { x: 60, y: 65 },
      width: 25,
      height: 35
    },
    {
      id: 3,
      name: "Cathédrale Saint-Jean",
      description: "Son illumination révèle les détails gothiques et crée une présence mystique dans le Vieux Lyon.",
      position: { x: 40, y: 50 },
      width: 20,
      height: 50
    }
  ];
  
  useEffect(() => {
    if (sectionRef.current && cityRef.current) {
      // City reveal animation
      gsap.fromTo(cityRef.current,
        { 
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Get current hour to set default time of day
      const hour = new Date().getHours();
      if (hour >= 7 && hour < 16) {
        setTimeOfDay('day');
      } else if (hour >= 16 && hour < 20) {
        setTimeOfDay('sunset');
      } else {
        setTimeOfDay('night');
      }
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  const handleBuildingClick = (id: number) => {
    setActiveBuilding(activeBuilding === id ? null : id);
  };
  
  // Background colors based on time of day
  const getBgColor = () => {
    switch (timeOfDay) {
      case 'day':
        return 'from-blue-400 via-blue-300 to-blue-200';
      case 'sunset':
        return 'from-purple-900 via-orange-500 to-yellow-300';
      case 'night':
        return 'from-blue-900 via-indigo-800 to-purple-900';
      default:
        return 'from-blue-900 via-indigo-800 to-purple-900';
    }
  };
  
  // City light intensity based on time of day
  const getLightIntensity = () => {
    switch (timeOfDay) {
      case 'day':
        return 'opacity-0';
      case 'sunset':
        return 'opacity-30';
      case 'night':
        return 'opacity-100';
      default:
        return 'opacity-70';
    }
  };
  
  // Star visibility based on time of day
  const getStarVisibility = () => {
    switch (timeOfDay) {
      case 'day':
        return 'opacity-0';
      case 'sunset':
        return 'opacity-30';
      case 'night':
        return 'opacity-90';
      default:
        return 'opacity-0';
    }
  };
  
  return (
    <section 
      ref={sectionRef} 
      id="streets" 
      className="section relative overflow-hidden"
      style={{
        background: timeOfDay === 'day' 
          ? '#67a1e5' 
          : timeOfDay === 'sunset' 
            ? '#472082' 
            : '#091747'
      }}
    >
      {/* Sky gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${getBgColor()} transition-colors duration-1000`}></div>
      
      {/* Stars */}
      <div className={`stars absolute inset-0 transition-opacity duration-1000 ${getStarVisibility()}`}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              opacity: Math.random() * 0.9 + 0.1,
              animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Les <span className="text-gold">Lumières</span> dans les rues
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto text-light/90">
            Une promenade nocturne dans Lyon, où la lumière transforme la ville en œuvre d'art.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Time control */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 bg-dark/60 backdrop-blur-sm rounded-lg border border-gold/20 md:w-64"
          >
            <h3 className="text-xl font-serif text-gold mb-4">Heure de la journée</h3>
            <p className="mb-4 text-light/80">
              Changez l'heure pour voir comment la ville s'illumine différemment.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setTimeOfDay('day')}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                  timeOfDay === 'day' ? 'bg-gold text-dark' : 'bg-light/10 hover:bg-light/20'
                }`}
              >
                <Sun size={18} />
                <span>Jour</span>
              </button>
              
              <button 
                onClick={() => setTimeOfDay('sunset')}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                  timeOfDay === 'sunset' ? 'bg-gold text-dark' : 'bg-light/10 hover:bg-light/20'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V5M5.6 6.6L7 8M3 12H5M19 12H21M17 8L18.4 6.6M12 19V21M19.4 19.4L17.7 17.7M6.3 17.7L4.6 19.4M17 12C17 14.8 14.8 17 12 17C9.2 17 7 14.8 7 12C7 9.2 9.2 7 12 7C14.8 7 17 9.2 17 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Crépuscule</span>
              </button>
              
              <button 
                onClick={() => setTimeOfDay('night')}
                className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                  timeOfDay === 'night' ? 'bg-gold text-dark' : 'bg-light/10 hover:bg-light/20'
                }`}
              >
                <Moon size={18} />
                <span>Nuit</span>
              </button>
            </div>
            
            {activeBuilding !== null && (
              <div className="mt-8 border-t border-light/20 pt-4">
                <h3 className="text-lg font-serif text-gold mb-2">
                  {buildings.find(b => b.id === activeBuilding)?.name}
                </h3>
                <p className="text-sm text-light/80">
                  {buildings.find(b => b.id === activeBuilding)?.description}
                </p>
              </div>
            )}
          </motion.div>
          
          {/* City illustration */}
          <motion.div
            ref={cityRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="city-container relative w-full max-w-2xl h-[60vh] rounded-lg overflow-hidden border border-light/10"
          >
            {/* City skyline */}
            <div className="city-skyline absolute bottom-0 left-0 w-full h-[75%]">
              {/* Buildings */}
              {buildings.map((building) => (
                <div
                  key={building.id}
                  onClick={() => handleBuildingClick(building.id)}
                  className={`absolute cursor-pointer transition-all duration-300 ${
                    activeBuilding === building.id ? 'z-20 scale-105' : 'z-10'
                  }`}
                  style={{
                    left: `${building.position.x}%`,
                    bottom: `${building.position.y - building.height/2}%`,
                    width: `${building.width}%`,
                    height: `${building.height}%`,
                    background: timeOfDay === 'day' 
                      ? '#d1d5db' 
                      : timeOfDay === 'sunset' 
                        ? '#4b5563' 
                        : '#1f2937'
                  }}
                >
                  {/* Building lights */}
                  <div 
                    className={`absolute inset-0 bg-yellow-300/30 transition-opacity duration-1000 ${getLightIntensity()}`}
                    style={{
                      boxShadow: activeBuilding === building.id 
                        ? '0 0 30px 10px rgba(255, 214, 64, 0.5)' 
                        : 'none',
                      opacity: activeBuilding === building.id 
                        ? 1 
                        : timeOfDay === 'day' 
                          ? 0 
                          : timeOfDay === 'sunset' 
                            ? 0.3 
                            : 0.8
                    }}
                  ></div>
                  
                  {/* Windows */}
                  <div className="windows absolute inset-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute bg-yellow-200"
                        style={{
                          left: `${Math.random() * 90}%`,
                          top: `${Math.random() * 90}%`,
                          width: `${Math.random() * 15 + 5}%`,
                          height: `${Math.random() * 10 + 5}%`,
                          opacity: timeOfDay === 'day' 
                            ? 0.1 
                            : timeOfDay === 'sunset' 
                              ? 0.5 
                              : 0.8
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Ground */}
              <div 
                className="ground absolute bottom-0 left-0 w-full h-[15%]"
                style={{
                  background: timeOfDay === 'day' 
                    ? '#4b5563' 
                    : timeOfDay === 'sunset' 
                      ? '#1f2937' 
                      : '#111827'
                }}
              ></div>
              
              {/* Rhône river */}
              <div 
                className="river absolute bottom-[5%] left-[10%] w-[80%] h-[5%] rounded-full"
                style={{
                  background: timeOfDay === 'day' 
                    ? 'linear-gradient(to right, #60a5fa, #93c5fd)' 
                    : timeOfDay === 'sunset' 
                      ? 'linear-gradient(to right, #7e22ce, #c026d3)' 
                      : 'linear-gradient(to right, #1e40af, #3b82f6)',
                  boxShadow: timeOfDay === 'night' 
                    ? '0 0 20px rgba(59, 130, 246, 0.5)' 
                    : 'none'
                }}
              ></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StreetsOfLight;