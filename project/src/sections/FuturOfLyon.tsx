import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutGrid, LightbulbOff, Zap, Heart, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GridItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const FuturOfLyon: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  const gridItems: GridItem[] = [
    {
      id: 1,
      title: "Éclairage adaptatif",
      description: "Des lumières qui s'adaptent au passage des piétons pour économiser l'énergie.",
      icon: <Zap size={24} />,
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "Zones noires",
      description: "Préservation de l'obscurité pour protéger la biodiversité nocturne.",
      icon: <LightbulbOff size={24} />,
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 3,
      title: "Art lumineux citoyen",
      description: "Façades interactives où les habitants peuvent créer des œuvres de lumière collectives.",
      icon: <Heart size={24} />,
      color: "from-red-500 to-red-700"
    },
    {
      id: 4,
      title: "Cartographie lumineuse",
      description: "Visualisation en temps réel des données urbaines à travers des installations lumineuses.",
      icon: <LayoutGrid size={24} />,
      color: "from-green-500 to-green-700"
    },
    {
      id: 5,
      title: "Patrimoine augmenté",
      description: "Projection d'histoires et de mémoires sur les monuments historiques.",
      icon: <Share2 size={24} />,
      color: "from-yellow-500 to-yellow-700"
    }
  ];
  
  useEffect(() => {
    if (sectionRef.current && gridRef.current) {
      // Grid animation
      const gridItems = gridRef.current.querySelectorAll('.grid-item');
      
      gsap.fromTo(gridItems, 
        { 
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  const toggleItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  return (
    <section ref={sectionRef} id="futur" className="section bg-gradient-to-b from-dark to-primary/30 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Le Futur <span className="text-gold">lumineux</span> de Lyon
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto text-light/90">
            Imaginez la ville de demain, où la lumière devient plus intelligente, durable et interactive.
          </p>
        </motion.div>
        
        <div className="mb-12 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-light/80"
          >
            Sélectionnez les innovations qui, selon vous, devraient éclairer le futur de Lyon. Construisez votre vision lumineuse de la ville de demain.
          </motion.p>
        </div>
        
        <div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {gridItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleItem(item.id)}
              className={`grid-item p-6 rounded-lg cursor-pointer transition-all duration-300 border ${
                selectedItems.includes(item.id)
                  ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
                  : 'border-light/10 bg-dark/40 hover:bg-dark/60'
              }`}
            >
              <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-gradient-to-br ${item.color}`}>
                {item.icon}
              </div>
              
              <h3 className={`text-xl font-serif mb-2 ${
                selectedItems.includes(item.id) ? 'text-gold' : 'text-light'
              }`}>
                {item.title}
              </h3>
              
              <p className="text-light/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xl md:text-2xl font-serif italic">
            « À Lyon, la lumière n'est jamais qu'un éclairage. <br/>
            Elle est un <span className="text-gold">langage</span>. »
          </p>
        </motion.div>
      </div>
      
      <div className="gradient-overlay" />
    </section>
  );
};

export default FuturOfLyon;