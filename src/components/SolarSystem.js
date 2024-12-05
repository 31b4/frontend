import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Planet from './Planet';
import PlanetMenu from './PlanetMenu';
import VisibilityControl from './VisibilityControl';

// Camera controller component
function CameraController({ targetPosition }) {
  const { camera } = useThree();
  const controls = useRef();

  useEffect(() => {
    if (targetPosition && controls.current) {
      const targetVector = [
        targetPosition[0],
        targetPosition[1] + 0.5, // Much closer above the planet
        targetPosition[2] + 2  // Much closer to the planet
      ];
      
      camera.position.set(...targetVector);
      controls.current.target.set(targetPosition[0], targetPosition[1], targetPosition[2]);
      controls.current.update();
    }
  }, [targetPosition, camera]);

  return <OrbitControls 
    ref={controls}
    enableZoom={true}
    enablePan={true}
    enableRotate={true}
    zoomSpeed={0.6}
    panSpeed={0.5}
    rotateSpeed={0.4}
    minDistance={0.2}
    maxDistance={1000}
  />;
}

function SolarSystem() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [enhancedVisibility, setEnhancedVisibility] = useState(true);

  useEffect(() => {
    fetch('http://localhost/space/space/public/api/planets')
      .then(res => res.json())
      .then(data => {
        console.log('Received planets:', data);
        setPlanets(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching planets:', error);
        setLoading(false);
      });
  }, []);

  const handlePlanetSelect = (planet) => {
    if (planet) {
      const planetPosition = [
        enhancedVisibility 
        ? planet.distance_from_sun*0.001+(planet.name !== 'Sun' ? 70 : 0) // Shortened distance when enhanced
        : planet.distance_from_sun,  // Real distance ratio
        0,
        0
      ];
      setSelectedPlanet(planetPosition);
    }
  };

  const handleVisibilityToggle = () => {
    setEnhancedVisibility(!enhancedVisibility);
  };

  if (loading) {
    return <div>Loading planets...</div>;
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PlanetMenu planets={planets} onSelectPlanet={handlePlanetSelect} />
      <VisibilityControl 
        isEnhanced={enhancedVisibility} 
        onToggle={handleVisibilityToggle} 
      />
      <Canvas 
        camera={{ 
          position: [0, 100, 200], 
          fov: 60,
          near: 0.1,
          far: 10000,
        }}
        style={{ background: '#000000' }}
      >
        <ambientLight intensity={1.0} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffffff" />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.5} 
          color="#ffffff" 
          castShadow 
        />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        
        <Stars 
          radius={508}
          depth={0}
          count={enhancedVisibility 
            ? 20000
            : 1}
          factor={7}
          saturation={0}
          fade={false}
        />
        
        <CameraController targetPosition={selectedPlanet} />
        
        {planets && planets.length > 0 ? (
          planets.slice(0, 10).map((planet, index) => (
            <Planet 
              key={planet.id}
              position={[
                enhancedVisibility 
                  ? planet.distance_from_sun*0.001+(planet.name !== 'Sun' ? 70 : 0)  // Shortened distance when enhanced
                  : planet.distance_from_sun,  // Real distance ratio
                0,
                0
              ]}
              planetData={{
                ...planet,
                size:enhancedVisibility ? planet.size * 10 : planet.size
              }}
            />
          ))
        ) : (
          <Planet 
            position={[0, 0, 0]}
            planetData={{
              id: 'default-mars',
              name: 'Mars',
              size: 6779,
              distance_from_sun: 227.9
            }}
          />
        )}
      </Canvas>
    </div>
  );
}

export default SolarSystem; 