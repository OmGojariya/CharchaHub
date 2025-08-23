import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ theme }) => {
  return (
    <div className={`home-page slide-in-up theme-${theme}`}>
      <div className="logo">
        💬 CharchaHub
      </div>
      <p className="tagline">
        Create temporary chatrooms that disappear in 24 hours.<br/>
        Share messages, code, and images in real-time!
      </p>
      <div className="home-buttons">
        <Link to="/create" className="btn btn-primary">
          🎨 Create Room
        </Link>
        <Link to="/join" className="btn btn-secondary">
          🚪 Join Room
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
