import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Moon, Cloud, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LightElement {
  id: number;
  type: 'color' | 'shape' | 'effect';
  name: string;
  value: string;
}

const FeteDeLumiere: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const installationRef = useRef<HTMLDivElement>(null);
  const [selectedElements, setSelectedElements] = useState<{
    color: string;
    shape: string;
    effect: string;
  }>({
    color: 'purple',
    shape: 'spiral',
    effect: 'pulse'
  });
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const lightElements: LightElement[] = [
    { id: 1, type: 'color', name: 'Violet', value: 'purple' },
    { id: 2, type: 'color', name: 'Doré', value: 'gold' },
    { id: 3, type: 'color', name: 'Bleu', value: 'blue' },
    { id: 4, type: 'color', name: 'Rouge', value: 'red' },
    { id: 5, type: 'shape', name: 'Spirale', value: 'spiral' },
    { id: 6, type: 'shape', name: 'Ondes', value: 'waves' },
    { id: 7, type: 'shape', name: 'Étoile', value: 'star' },
    { id: 8, type: 'shape', name: 'Cercles', value: 'circles' },
    { id: 9, type: 'effect', name: 'Pulsation', value: 'pulse' },
    { id: 10, type: 'effect', name: 'Rotation', value: 'rotate' },
    { id: 11, type: 'effect', name: 'Scintillement', value: 'twinkle' },
    { id: 12, type: 'effect', name: 'Ondulation', value: 'ripple' }
  ];
  
  useEffect(() => {
    if (sectionRef.current && installationRef.current) {
      // Canvas animation
      gsap.fromTo(installationRef.current,
        { 
          opacity: 0,
          scale: 0.9
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Draw on canvas
    updateCanvas();
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [selectedElements]);
  
  const updateCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to parent size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() / 1000;
    
    // Draw based on selected elements
    switch (selectedElements.shape) {
      case 'spiral':
        drawSpiral(ctx, centerX, centerY, selectedElements.color, selectedElements.effect, time);
        break;
      case 'waves':
        drawWaves(ctx, centerX, centerY, selectedElements.color, selectedElements.effect, time);
        break;
      case 'star':
        drawStar(ctx, centerX, centerY, selectedElements.color, selectedElements.effect, time);
        break;
      case 'circles':
        drawCircles(ctx, centerX, centerY, selectedElements.color, selectedElements.effect, time);
        break;
      default:
        drawSpiral(ctx, centerX, centerY, selectedElements.color, selectedElements.effect, time);
    }
    
    // Animation loop
    requestAnimationFrame(updateCanvas);
  };
  
  const drawSpiral = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, effect: string, time: number) => {
    const size = Math.min(centerX, centerY) * 0.8;
    const numSpins = 5;
    const numPoints = 100;
    
    ctx.strokeStyle = getColor(color);
    ctx.lineWidth = 4;
    ctx.beginPath();
    
    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1);
      const angle = numSpins * Math.PI * 2 * t;
      const radius = t * size;
      
      // Apply effects
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      
      if (effect === 'pulse') {
        const pulse = 1 + 0.2 * Math.sin(time * 3);
        x = centerX + radius * Math.cos(angle) * pulse;
        y = centerY + radius * Math.sin(angle) * pulse;
      } else if (effect === 'rotate') {
        const rotationOffset = time;
        x = centerX + radius * Math.cos(angle + rotationOffset);
        y = centerY + radius * Math.sin(angle + rotationOffset);
      } else if (effect === 'twinkle') {
        ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 10 + time * 5);
      } else if (effect === 'ripple') {
        const ripple = Math.sin(t * 20 - time * 5) * 5;
        x += ripple * Math.cos(angle + Math.PI/2);
        y += ripple * Math.sin(angle + Math.PI/2);
      }
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    ctx.globalAlpha = 1;
  };
  
  const drawWaves = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, effect: string, time: number) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const amplitude = height * 0.2;
    const frequency = 0.01;
    const numWaves = 3;
    
    ctx.strokeStyle = getColor(color);
    ctx.lineWidth = 6;
    
    for (let wave = 0; wave < numWaves; wave++) {
      const offset = wave * 40;
      const phaseShift = wave * Math.PI / 6;
      
      ctx.beginPath();
      
      for (let x = 0; x < width; x += 5) {
        let y = centerY + amplitude * Math.sin(x * frequency + time * 2 + phaseShift);
        
        // Apply effects
        if (effect === 'pulse') {
          const pulse = 1 + 0.3 * Math.sin(time * 2);
          y = centerY + amplitude * pulse * Math.sin(x * frequency + time * 2 + phaseShift);
        } else if (effect === 'rotate') {
          // For waves, rotate changes the phase
          y = centerY + amplitude * Math.sin(x * frequency + time * 3 + phaseShift);
        } else if (effect === 'twinkle') {
          ctx.globalAlpha = 0.5 + 0.5 * Math.sin(x * 0.05 + time * 3);
        } else if (effect === 'ripple') {
          const rippleFreq = Math.sin(x * 0.02 - time * 2) * 10;
          y += rippleFreq;
        }
        
        if (x === 0) {
          ctx.moveTo(x, y - offset);
        } else {
          ctx.lineTo(x, y - offset);
        }
      }
      
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };
  
  const drawStar = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, effect: string, time: number) => {
    const size = Math.min(centerX, centerY) * 0.8;
    const numPoints = 8;
    
    ctx.fillStyle = getColor(color);
    ctx.beginPath();
    
    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (i * Math.PI) / numPoints;
      const radius = i % 2 === 0 ? size : size * 0.4;
      
      // Apply effects
      let x = centerX + radius * Math.cos(angle);
      let y = centerY + radius * Math.sin(angle);
      
      if (effect === 'pulse') {
        const pulse = 1 + 0.2 * Math.sin(time * 3);
        x = centerX + radius * pulse * Math.cos(angle);
        y = centerY + radius * pulse * Math.sin(angle);
      } else if (effect === 'rotate') {
        const rotationOffset = time;
        x = centerX + radius * Math.cos(angle + rotationOffset);
        y = centerY + radius * Math.sin(angle + rotationOffset);
      } else if (effect === 'twinkle') {
        ctx.globalAlpha = 0.5 + 0.5 * Math.sin(time * 5);
      } else if (effect === 'ripple') {
        const ripple = Math.sin(angle * 5 - time * 3) * 10;
        x += ripple * Math.cos(angle);
        y += ripple * Math.sin(angle);
      }
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  };
  
  const drawCircles = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, effect: string, time: number) => {
    const maxRadius = Math.min(centerX, centerY) * 0.8;
    const numCircles = 6;
    
    ctx.strokeStyle = getColor(color);
    ctx.lineWidth = 5;
    
    for (let i = 0; i < numCircles; i++) {
      const t = i / (numCircles - 1);
      let radius = t * maxRadius;
      
      // Apply effects
      if (effect === 'pulse') {
        const pulse = 1 + 0.2 * Math.sin(time * 3 + i);
        radius *= pulse;
      } else if (effect === 'rotate') {
        // For circles, rotation isn't visible, so we'll make them eccentric
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time + i * Math.PI / numCircles);
        ctx.scale(1, 0.7);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.restore();
        ctx.stroke();
        continue;
      } else if (effect === 'twinkle') {
        ctx.globalAlpha = 0.3 + 0.7 * Math.sin(time * 3 + i * 2);
      } else if (effect === 'ripple') {
        radius += Math.sin(time * 5 + i * 2) * 10;
      }
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };
  
  const getColor = (color: string): string => {
    switch (color) {
      case 'purple':
        return '#8b5cf6';
      case 'gold':
        return '#f59e0b';
      case 'blue':
        return '#3b82f6';
      case 'red':
        return '#ef4444';
      default:
        return '#8b5cf6';
    }
  };
  
  const handleElementSelect = (element: LightElement) => {
    setSelectedElements({
      ...selectedElements,
      [element.type]: element.value
    });
  };
  
  const handleSendInstallation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSent(false);
        setEmail('');
      }, 3000);
    }, 1500);
  };
  
  return (
    <section ref={sectionRef} id="fete" className="section bg-dark relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            La <span className="text-gold">Fête des Lumières</span>
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto text-light/90">
            Immergez-vous dans la magie du 8 décembre, quand Lyon devient une toile géante pour les artistes de la lumière.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-serif text-gold mb-4">Créez votre installation</h3>
              <p className="mb-6 text-light/80">
                Combinez couleurs, formes et effets pour créer votre propre installation lumineuse, puis partagez-la avec un ami!
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {['color', 'shape', 'effect'].map((type) => (
                <div key={type} className="p-4 bg-dark/60 backdrop-blur-sm rounded-lg border border-light/10">
                  <h4 className="text-lg font-serif mb-3 capitalize">
                    {type === 'color' ? 'Couleur' : type === 'shape' ? 'Forme' : 'Effet'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {lightElements
                      .filter(element => element.type === type)
                      .map(element => (
                        <button
                          key={element.id}
                          onClick={() => handleElementSelect(element)}
                          className={`py-2 px-4 rounded-lg transition-colors ${
                            selectedElements[element.type as keyof typeof selectedElements] === element.value
                              ? 'bg-gold text-dark'
                              : 'bg-light/10 hover:bg-light/20 text-light'
                          }`}
                        >
                          {element.name}
                        </button>
                      ))
                    }
                  </div>
                </div>
              ))}
              
              <form onSubmit={handleSendInstallation} className="p-4 bg-dark/60 backdrop-blur-sm rounded-lg border border-light/10">
                <h4 className="text-lg font-serif mb-3">Partagez votre création</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse email d'un ami"
                    className="flex-1 py-2 px-3 bg-dark/50 border border-light/20 rounded text-light focus:border-gold/50 focus:outline-none"
                    disabled={isSending || isSent}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSending || isSent || !email}
                    className={`py-2 px-4 rounded-lg flex items-center gap-2 transition-colors ${
                      isSent
                        ? 'bg-green-500 text-white'
                        : isSending
                          ? 'bg-gold/50 cursor-not-allowed text-dark'
                          : email
                            ? 'bg-gold hover:bg-gold/80 text-dark'
                            : 'bg-gold/50 cursor-not-allowed text-dark'
                    }`}
                  >
                    {isSent ? 'Envoyé!' : isSending ? 'Envoi...' : 'Envoyer'}
                    {isSent ? null : <Send size={16} />}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div 
            ref={installationRef}
            className="relative h-[500px] rounded-lg overflow-hidden border border-gold/20"
          >
            <canvas 
              ref={canvasRef}
              className="absolute inset-0 w-full h-full bg-black"
            />
            
            {/* Building silhouette overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-black/70 backdrop-blur-sm" style={{
              maskImage: 'url(https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
              maskSize: 'cover',
              maskPosition: 'bottom'
            }}></div>
          </div>
        </div>
      </div>
      
      <div className="gradient-overlay" />
    </section>
  );
};

export default FeteDeLumiere;