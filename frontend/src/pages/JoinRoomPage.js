import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { roomApi } from '../services/api';
import { avatarData, AvatarSVG, getRandomAvatar } from '../utils/avatars';

const JoinRoomPage = ({ theme }) => {
  const [formData, setFormData] = useState({
    roomKey: '',
    username: '',
    avatar: avatarData[0] // Default to first avatar
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If coming from create room page, pre-fill the room key
    if (location.state?.roomKey) {
      setFormData(prev => ({ ...prev, roomKey: location.state.roomKey }));
    }
  }, [location.state]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({ ...prev, avatar }));
  };

  const handleRandomAvatar = () => {
    const randomAvatar = getRandomAvatar();
    setFormData(prev => ({ ...prev, avatar: randomAvatar }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { roomKey, username, avatar } = formData;
    
    if (!roomKey.trim() || !username.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (username.length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First find the room by key
      const findResponse = await roomApi.findRoomByKey(roomKey.trim());
      
      if (!findResponse.success) {
        setError(findResponse.message || 'Room not found');
        return;
      }

      // Store user data and navigate to chat
      localStorage.setItem('charchahub-user', JSON.stringify({
        username: username.trim(),
        avatar: avatar.id, // Store avatar ID for reference
        roomKey: roomKey.trim(),
        roomName: findResponse.data.name
      }));

      // Navigate to chat room
      navigate('/chat', {
        state: {
          roomId: findResponse.data.id,
          roomKey: roomKey.trim(),
          roomName: findResponse.data.name,
          username: username.trim(),
          avatar: avatar.id,
          isCreator: false
        }
      });
      
    } catch (error) {
      console.error('Join room error:', error);
      // Show the actual error message from the API
      setError(error.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`home-page theme-${theme}`}>
      <Link to="/" className="back-button">
        ←
      </Link>
      
      <div className="form-container slide-in-up">
        <h2 className="form-title">🚪 Join Room</h2>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Room Key:</label>
            <input
              type="text"
              className="form-input"
              value={formData.roomKey}
              onChange={(e) => handleInputChange('roomKey', e.target.value)}
              placeholder="Enter the room key"
              maxLength={20}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Your Name:</label>
            <input
              type="text"
              className="form-input"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              disabled={loading}
            />
          </div>

          <div className="avatar-selection">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <label className="form-label">Choose Your Avatar:</label>
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn"
                style={{
                  padding: '5px 10px',
                  fontSize: '0.8rem',
                  background: 'var(--accent-4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px'
                }}
                onMouseEnter={(e) => e.target.style.background = 'var(--accent-5)'}
                onMouseLeave={(e) => e.target.style.background = 'var(--accent-4)'}
              >
                🎲 Random
              </button>
            </div>
            
            <div className="avatar-grid">
              {avatarData.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`avatar-option ${formData.avatar.id === avatar.id ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect(avatar)}
                  title={avatar.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <AvatarSVG avatarData={avatar} size={50} />
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Selected: <strong>{formData.avatar.name}</strong>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-secondary"
            disabled={loading}
            style={{ width: '100%', marginTop: '2rem' }}
          >
            {loading ? (
              <span className="loading">
                <span>Joining Room...</span>
              </span>
            ) : (
              '🎉 Join Room'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoomPage;
