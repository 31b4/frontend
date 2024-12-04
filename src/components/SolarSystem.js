import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Planet from './Planet';

function SolarSystem({ planets }) {
  console.log('Planets data:', planets);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <Stars radius={300} depth={60} count={20000} factor={7} />
        <OrbitControls />
        
        {planets && planets.length > 0 ? (
          planets.map((planet, index) => (
            <Planet 
              key={planet.id}
              position={[index * 5, 0, 0]}
              planetData={planet}
            />
          ))
        ) : (
          <Planet 
            position={[0, 0, 0]}
            planetData={{
              name: 'Test Planet',
              size: 12742,
              distance_from_sun: 0
            }}
          />
        )}
      </Canvas>
    </div>
  );
}

export default SolarSystem; 