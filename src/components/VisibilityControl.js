import React from 'react';

function VisibilityControl({ isEnhanced, onToggle }) {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 1000
    }}>
      <button
        onClick={onToggle}
        style={{
          background: isEnhanced ? 'rgba(65, 105, 225, 0.8)' : 'rgba(0, 0, 0, 0.8)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
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
        {isEnhanced ? 'Real Scale' : 'Enhanced Visibility'}
      </button>
    </div>
  );
}

export default VisibilityControl; 