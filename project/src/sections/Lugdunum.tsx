import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hill3D } from '../components/3d/Hill3D';

gsap.registerPlugin(ScrollTrigger);

const Lugdunum: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hillRef = useRef<HTMLDivElement>(null);
  const [activePoint, setActivePoint] = React.useState<number | null>(null);
  
  const infoPoints = [
    {
      id: 1,
      title: "Autel des Trois Gaules",
      description: "L'Autel des Trois Gaules, érigé en 12 av. J.-C., était le centre religieux et politique de la Gaule romaine.",
      position: { x: -20, y: 30 }
    },
    {
      id: 2,
      title: "Théâtre antique",
      description: "Construit au Ier siècle, le Théâtre antique pouvait accueillir jusqu'à 10 000 spectateurs.",
      position: { x: 25, y: 40 }
    },
    {
      id: 3,
      title: "Temple de Cybèle",
      description: "Ce sanctuaire dédié à Cybèle, la grande déesse mère, témoigne de l'importance des cultes orientaux à Lugdunum.",
      position: { x: 10, y: 65 }
    }
  ];
  
  useEffect(() => {
    if (sectionRef.current && textRef.current) {
      // Text reveal animation
      gsap.fromTo(textRef.current.children, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Hill animation
      if (hillRef.current) {
        gsap.fromTo(hillRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  const handlePointClick = (id: number) => {
    setActivePoint(activePoint === id ? null : id);
  };
  
  return (
    <section ref={sectionRef} id="lugdunum" className="section bg-primary/10 relative overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div ref={textRef} className="z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            <span className="text-gold">Lugdunum</span>, la Colline de la Lumière
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg mb-6 text-light/90"
          >
            C'est ici, sur la colline de Fourvière, que tout commence. Le dieu celte Lug, divinité de la lumière, aurait donné son nom à cette cité qui deviendra la capitale des Gaules.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 text-light/70"
          >
            Cliquez sur les points lumineux pour découvrir les vestiges de cette époque qui a fondé l'identité lumineuse de Lyon.
          </motion.p>
          
          {activePoint !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-dark/60 backdrop-blur-sm p-6 rounded-lg border border-gold/20"
            >
              <h3 className="text-xl font-serif text-gold mb-2">
                {infoPoints.find(p => p.id === activePoint)?.title}
              </h3>
              <p className="text-light/80">
                {infoPoints.find(p => p.id === activePoint)?.description}
              </p>
            </motion.div>
          )}
        </div>
        
        <div ref={hillRef} className="h-[50vh] md:h-[60vh] relative">
          <Canvas
            camera={{ position: [0, 20, 100], fov: 45 }}
            className="canvas-container"
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#f6b75d" />
            <directionalLight 
              position={[50, 100, 50]} 
              intensity={1.5} 
              color="#f8f7f4" 
              castShadow
            />
            <Hill3D 
              infoPoints={infoPoints} 
              activePoint={activePoint} 
              onPointClick={handlePointClick}
            />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              rotateSpeed={0.5}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
          
          {/* Mobile interaction points */}
          <div className="block md:hidden absolute inset-0 z-10">
            {infoPoints.map(point => (
              <button
                key={point.id}
                onClick={() => handlePointClick(point.id)}
                className={`absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                  activePoint === point.id ? 'bg-gold' : 'bg-light/50'
                }`}
                style={{
                  left: `${point.position.x + 50}%`,
                  top: `${point.position.y}%`,
                  boxShadow: activePoint === point.id 
                    ? '0 0 15px 5px rgba(201, 167, 88, 0.5)' 
                    : '0 0 8px 2px rgba(248, 247, 244, 0.3)'
                }}
              >
                <span className="sr-only">{point.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="gradient-overlay" />
    </section>
  );
};

export default Lugdunum;