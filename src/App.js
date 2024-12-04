import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SolarSystem from './components/SolarSystem';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/planets')
      .then(response => {
        setPlanets(response.data);
      })
      .catch(error => {
        console.error('Error fetching planets:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className="solar-system-container">
        <SolarSystem planets={planets} />
      </div>
      
      {selectedPlanet && (
        <div className="planet-info">
          <h2>{selectedPlanet.name}</h2>
          <p>Diameter: {selectedPlanet.size} km</p>
          <p>Distance from Sun: {selectedPlanet.distance_from_sun} million km</p>
        </div>
      )}
    </div>
  );
}

export default App; 