import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <div className="theme-toggle">
      <button 
        onClick={onToggle} 
        className="theme-toggle-button"
        title={`Switch to ${theme === 'colorful' ? 'Base' : 'Colorful'} Theme`}
      >
        {theme === 'colorful' ? '🎨' : '⚪'}
      </button>
    </div>
  );
};

export default ThemeToggle;
