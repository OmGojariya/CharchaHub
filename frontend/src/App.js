import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateRoomPage from './pages/CreateRoomPage';
import JoinRoomPage from './pages/JoinRoomPage';
import ChatRoomPage from './pages/ChatRoomPage';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';

function App() {
  const [theme, setTheme] = useState('colorful');

  useEffect(() => {
    const savedTheme = localStorage.getItem('charchahub-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('charchahub-theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'colorful' ? 'base' : 'colorful');
  };

  return (
    <Router>
      <div className={`App theme-${theme}`}>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="/create" element={<CreateRoomPage theme={theme} />} />
          <Route path="/join" element={<JoinRoomPage theme={theme} />} />
          <Route path="/chat" element={<ChatRoomPage theme={theme} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
