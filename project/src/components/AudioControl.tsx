import React, { useEffect, useRef } from 'react';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store';

const AudioControl: React.FC = () => {
  const { currentSection, isMuted, volume, setVolume, toggleMute } = useStore();
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const narratorRef = useRef<HTMLAudioElement | null>(null);
  
  // Audio sources for different sections
  const ambientSources = [
    'https://soundbible.com/mp3/Evening%20Crickets-SoundBible.com-1485196746.mp3', // Prologue
    'https://soundbible.com/mp3/1-Light-Wind-SoundBible.com-1639125087.mp3', // Lugdunum
    'https://soundbible.com/mp3/old-fashioned-typewriter-daniel_simon.mp3', // Renaissance
    'https://soundbible.com/mp3/Film_Projector-Projector_Film-1686580036.mp3', // Freres Lumiere
    'https://soundbible.com/mp3/Street_Cafe-Cafe_Sounds-1305594079.mp3', // Streets
    'https://soundbible.com/mp3/Crowd_Outdoor-Niko_Jerichow-2246392742.mp3', // Fete
    'https://soundbible.com/mp3/Futuristic_Machine_Powering_Up-SoundBible.com-1980812962.mp3', // Futur
  ];
  
  const narratorSources = [
    'https://example.com/narrator-prologue.mp3', // Replace with actual narrator clips
    'https://example.com/narrator-lugdunum.mp3',
    'https://example.com/narrator-renaissance.mp3',
    'https://example.com/narrator-freres.mp3',
    'https://example.com/narrator-streets.mp3',
    'https://example.com/narrator-fete.mp3',
    'https://example.com/narrator-futur.mp3',
  ];
  
  useEffect(() => {
    // Initialize audio elements
    if (!ambientRef.current) {
      ambientRef.current = new Audio();
      ambientRef.current.loop = true;
    }
    
    if (!narratorRef.current) {
      narratorRef.current = new Audio();
      narratorRef.current.loop = false;
    }
    
    // Update volumes based on store state
    if (ambientRef.current && narratorRef.current) {
      ambientRef.current.volume = isMuted ? 0 : volume * 0.4; // Ambient at lower volume
      narratorRef.current.volume = isMuted ? 0 : volume;
    }
    
    // Play section-specific audio
    if (ambientRef.current) {
      ambientRef.current.src = ambientSources[currentSection];
      ambientRef.current.play().catch(e => console.log("Ambient audio play prevented:", e));
    }
    
    // Temporarily disable actual narrator audio since we don't have the files
    // if (narratorRef.current && narratorSources[currentSection]) {
    //   narratorRef.current.src = narratorSources[currentSection];
    //   narratorRef.current.play().catch(e => console.log("Narrator audio play prevented:", e));
    // }
    
    return () => {
      // Cleanup
      if (ambientRef.current) ambientRef.current.pause();
      if (narratorRef.current) narratorRef.current.pause();
    };
  }, [currentSection, isMuted, volume]);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (ambientRef.current && narratorRef.current) {
      ambientRef.current.volume = isMuted ? 0 : newVolume * 0.4;
      narratorRef.current.volume = isMuted ? 0 : newVolume;
    }
  };
  
  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX />;
    if (volume < 0.4) return <Volume />;
    if (volume < 0.7) return <Volume1 />;
    return <Volume2 />;
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-40 bg-dark/80 backdrop-blur-md p-3 rounded-full shadow-lg flex items-center gap-2">
      <button 
        onClick={toggleMute}
        className="p-1 hover:text-gold transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <VolumeIcon />
      </button>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-20 accent-gold"
        aria-label="Volume control"
      />
    </div>
  );
};

export default AudioControl;