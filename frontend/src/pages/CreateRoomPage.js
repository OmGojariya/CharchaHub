import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { roomApi } from '../services/api';
import { avatarData } from '../utils/avatars';

const CreateRoomPage = ({ theme }) => {
  const [formData, setFormData] = useState({
    roomName: '',
    roomKey: '',
    username: '',
    avatar: avatarData[0] // Use the first avatar object
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleAvatarSelect = (avatar) => {
    setFormData(prev => ({ ...prev, avatar }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { roomName, roomKey, username, avatar } = formData;
    
    if (!roomName.trim() || !roomKey.trim() || !username.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await roomApi.createRoom(roomName.trim(), roomKey.trim());
      if (response.success) {
        // Store user data and navigate to chat
        localStorage.setItem('charchahub-user', JSON.stringify({
          username: username.trim(),
          avatar,
          roomKey: roomKey.trim(),
          roomName: roomName.trim()
        }));
        
        navigate('/chat', { 
          state: { 
            roomKey: roomKey.trim(),
            roomName: roomName.trim(),
            username: username.trim(),
            avatar,
            isCreator: true
          }
        });
      } else {
        setError(response.message || 'Failed to create room');
      }
    } catch (error) {
      console.error('Create room error:', error);
      setError('Network error. Please try again.');
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
        <h2 className="form-title">🎨 Create Room</h2>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Room Name:</label>
            <input
              type="text"
              className="form-input"
              value={formData.roomName}
              onChange={(e) => handleInputChange('roomName', e.target.value)}
              placeholder="Enter a fun room name"
              maxLength={50}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Room Key:</label>
            <input
              type="text"
              className="form-input"
              value={formData.roomKey}
              onChange={(e) => handleInputChange('roomKey', e.target.value)}
              placeholder="Create a unique room key"
              maxLength={20}
              disabled={loading}
            />
            <small style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Share this key with friends to let them join your room
            </small>
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
            <label className="form-label">Choose Your Avatar:</label>
            <div className="avatar-grid">
              {avatarData.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`avatar-option ${formData.avatar.id === avatar.id ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect(avatar)}
                  title={avatar.name}
                >
                  <div dangerouslySetInnerHTML={{ __html: avatar.svg }} />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '2rem' }}
          >
            {loading ? (
              <span className="loading">
                <span>Creating Room...</span>
              </span>
            ) : (
              '🚀 Create & Join Room'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomPage;
