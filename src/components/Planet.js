import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const BASE_URL = process.env.PUBLIC_URL || '';

// Base sizes of the 3D models (approximate diameters in their original scale)
export const MODEL_BASE_SIZES = {
  Mercury: 1,
  Venus: 1,
  Earth: 1,
  Mars: 1,
  Jupiter: 1,
  Saturn: 0.1,
  Uranus: 1,
  Neptune: 1,
  Sun: 51
};

function Planet({ position, planetData }) {
  const meshRef = useRef();
  
  const modelPath = planetData.name === 'Mars' ? 
    '/models/mars.glb' : 
    getPlanetModel(planetData.name);
    
  const { scene } = useGLTF(modelPath);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Calculate normalized scale based on actual planet size vs model base size
  const getNormalizedScale = () => {
    const baseModelSize = MODEL_BASE_SIZES[planetData.name] || 1;
    return 0.001*baseModelSize * planetData.size

    const scaleFactor = planetData.size / baseModelSize;
    return scaleFactor * 0.000001; // Global scale factor to fit scene
  };

  if (planetData.name === 'Sun') {
    const sunScale = getNormalizedScale();
    return (
      <mesh position={[0, 0, 0]} scale={[sunScale, sunScale, sunScale]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>
    );
  }
  
  const scale = getNormalizedScale();
  
  return (
    <primitive 
      ref={meshRef}
      object={scene}
      position={position}
      scale={[scale, scale, scale]}
    />
  );
}

function getPlanetModel(planetName) {
  const models = {
    Mercury: `${BASE_URL}/models/mercury.glb`,
    Venus: `${BASE_URL}/models/venus.glb`,
    Earth: `${BASE_URL}/models/earth.glb`,
    Mars: `${BASE_URL}/models/mars.glb`,
    Jupiter: `${BASE_URL}/models/jupiter.glb`,
    Saturn: `${BASE_URL}/models/saturn.glb`,
    Uranus: `${BASE_URL}/models/uranus.glb`,
    Neptune: `${BASE_URL}/models/neptune.glb`
  };
  return models[planetName] || `${BASE_URL}/models/mars.glb`;
}

export default Planet; 