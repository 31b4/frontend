import React from 'react';

function PlanetMenu({ planets, onSelectPlanet }) {
  const planetColors = {
    Mercury: '#A0522D',
    Venus: '#DEB887',
    Earth: '#4169E1',
    Mars: '#CD5C5C',
    Jupiter: '#DAA520',
    Saturn: '#F4A460',
    Uranus: '#87CEEB',
    Neptune: '#1E90FF',
    Sun: '#FFD700'
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '15px',
      borderRadius: '12px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
    }}>
      {planets.map((planet) => (
        <button
          key={planet.id}
          onClick={() => onSelectPlanet(planet)}
          style={{
            background: `linear-gradient(45deg, ${planetColors[planet.name] || '#666'}, rgba(0,0,0,0.7))`,
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textAlign: 'left',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: '120px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            ':hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
          }}
        >
          <span style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: planetColors[planet.name] || '#666',
            display: 'inline-block'
          }}></span>
          {planet.name}
        </button>
      ))}
    </div>
  );
}

export default PlanetMenu; 