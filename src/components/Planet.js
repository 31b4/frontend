import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

function Planet({ position, planetData }) {
  const meshRef = useRef();

  // Forgás animáció
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Debug log
  console.log('Rendering planet:', planetData);

  // Módosított méretarány számítás
  const scale = Math.max(0.5, planetData.size / 50000); // Minimum 0.5 egység méret

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, scale]}
    >
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial 
          color={getPlanetColor(planetData.name)}
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>
    </mesh>
  );
}

// Segédfüggvény a bolygók színének meghatározásához
function getPlanetColor(planetName) {
  const colors = {
    Mercury: '#A0522D',
    Venus: '#DEB887',
    Earth: '#4169E1',
    Mars: '#CD5C5C',
    Jupiter: '#DAA520',
    Saturn: '#F4A460',
    Uranus: '#87CEEB',
    Neptune: '#1E90FF'
  };
  return colors[planetName] || '#ffffff';
}

export default Planet; 