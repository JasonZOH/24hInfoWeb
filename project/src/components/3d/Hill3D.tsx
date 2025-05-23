import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { Group } from 'three';

interface InfoPoint {
  id: number;
  title: string;
  description: string;
  position: { x: number, y: number };
}

interface Hill3DProps {
  infoPoints: InfoPoint[];
  activePoint: number | null;
  onPointClick: (id: number) => void;
}

export const Hill3D: React.FC<Hill3DProps> = ({ infoPoints, activePoint, onPointClick }) => {
  const groupRef = useRef<Group>(null);
  
  // This would normally load a 3D model, but we'll create a simplified hill
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.05;
    }
  });
  
  // Create 3D positions from 2D coordinates
  const getPosition = (point: InfoPoint) => {
    const x = point.position.x * 0.2;
    const y = (100 - point.position.y) * 0.1;
    const z = Math.random() * 5;
    return [x, y, z];
  };

  return (
    <group ref={groupRef}>
      {/* Simplified hill mesh */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <coneGeometry args={[25, 40, 32, 1, false]} />
        <meshStandardMaterial 
          color="#556b2f" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Temple on top */}
      <group position={[0, 20, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[12, 2, 8]} />
          <meshStandardMaterial color="#d2b48c" />
        </mesh>
        
        {/* Columns */}
        {[-5, -3, -1, 1, 3, 5].map((x, i) => (
          <React.Fragment key={`column-front-${i}`}>
            <mesh position={[x, 2, 3.5]} receiveShadow castShadow>
              <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
              <meshStandardMaterial color="#f5f5dc" />
            </mesh>
            <mesh position={[x, 2, -3.5]} receiveShadow castShadow>
              <cylinderGeometry args={[0.5, 0.5, 4, 8]} />
              <meshStandardMaterial color="#f5f5dc" />
            </mesh>
          </React.Fragment>
        ))}
        
        {/* Roof */}
        <mesh position={[0, 5, 0]} receiveShadow castShadow>
          <coneGeometry args={[8, 4, 4, 1]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      </group>
      
      {/* Interactive points */}
      {infoPoints.map((point) => {
        const [x, y, z] = getPosition(point);
        const isActive = activePoint === point.id;
        
        return (
          <group key={point.id} position={[x, y, z]} onClick={() => onPointClick(point.id)}>
            <pointLight 
              distance={10} 
              intensity={isActive ? 2 : 1} 
              color={isActive ? "#f6b75d" : "#f8f7f4"}
            />
            <mesh>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial 
                color={isActive ? "#f6b75d" : "#f8f7f4"} 
                emissive={isActive ? "#f6b75d" : "#f8f7f4"} 
                emissiveIntensity={isActive ? 2 : 0.5}
              />
            </mesh>
            
            {/* Only show labels in 3D space for desktop */}
            <Html
              position={[0, 2, 0]}
              style={{
                display: isActive ? 'block' : 'none',
                width: '150px',
                textAlign: 'center',
                background: 'rgba(10, 10, 20, 0.7)',
                color: '#f8f7f4',
                padding: '0.5rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                pointerEvents: 'none',
                transform: 'translate3d(-50%, -50%, 0)'
              }}
              className="hidden md:block"
            >
              {point.title}
            </Html>
          </group>
        );
      })}
      
      {/* Ray of light */}
      <mesh position={[0, 100, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[5, 20, 100, 16, 1, true]} />
        <meshStandardMaterial 
          color="#f6b75d" 
          emissive="#f6b75d"
          emissiveIntensity={2}
          transparent={true}
          opacity={0.3}
          side={2} // THREE.DoubleSide
        />
      </mesh>
    </group>
  );
};