import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import UserList from '../components/UserList';
import webSocketService from '../services/websocket';
import { roomApi } from '../services/api';
import '../styles/ChatRoom.css';

const ChatRoomPage = ({ theme }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [typing, setTyping] = useState([]);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get room and user info from location state or localStorage
  const roomData = location.state || JSON.parse(localStorage.getItem('charchahub-user') || '{}');
  const { roomId, roomKey, roomName, username, avatar, isCreator } = roomData;

  const loadChatData = useCallback(async () => {
    try {
      setLoading(true);
      
      if (roomId) {
        const messagesResponse = await roomApi.getMessages(roomId);
        if (messagesResponse.success) {
          setMessages(messagesResponse.data || []);
        }
      }

      setUsers([{ username, avatar, isOnline: true }]);
      
    } catch (error) {
      console.error('Load chat data error:', error);
      setError('Failed to load chat data');
    } finally {
      setLoading(false);
    }
  }, [roomId, username, avatar]);

  const connectWebSocket = useCallback(() => {
    webSocketService.connect(roomId || roomKey, {
      onMessage: (message) => {
        setMessages(prev => [...prev, message]);
      },
      onUserJoined: (user) => {
        setUsers(prev => {
          const exists = prev.find(u => u.username === user.username);
          if (!exists) {
            return [...prev, { ...user, isOnline: true }];
          }
          return prev;
        });
      },
      onUserLeft: (user) => {
        setUsers(prev => prev.filter(u => u.username !== user.username));
      },
      onTyping: (typingUsers) => {
        setTyping(typingUsers.filter(u => u !== username));
      },
      onError: (error) => {
        console.error('WebSocket error:', error);
        setError('Connection lost. Please refresh the page.');
      }
    });

    setTimeout(() => {
      webSocketService.addUser({
        username,
        avatar,
        roomKey
      });
    }, 1000);
  }, [roomId, roomKey, username, avatar]);

  useEffect(() => {
    if (!username || !roomKey) {
      navigate('/');
      return;
    }

    // Load existing messages and users
    loadChatData();

    // Connect to WebSocket
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      webSocketService.disconnect();
    };
  }, [roomKey, username, navigate, loadChatData, connectWebSocket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageData) => {
    const message = {
      ...messageData,
      username,
      avatar,
      timestamp: new Date(),
      roomKey
    };
    
    webSocketService.sendMessage(message);
  };

  const handleTyping = (isTyping) => {
    webSocketService.sendTyping(username, isTyping);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeaveRoom = () => {
    if (window.confirm('Are you sure you want to leave the room?')) {
      webSocketService.leaveRoom({ username });
      localStorage.removeItem('charchahub-user');
      navigate('/');
    }
  };

  if (!username || !roomKey) {
    return (
      <div className={`home-page theme-${theme}`}>
        <div className="error">Invalid room access. Please join a room first.</div>
      </div>
    );
  }

  return (
    <div className={`chat-room theme-${theme}`}>
      {/* Sidebar with users */}
      <div className="chat-sidebar">
        <div className="room-header">
          <div className="room-name">
            💬 {roomName || `Room ${roomKey}`}
          </div>
          <div className="room-info">
            {isCreator && '👑 Your Room'} • Expires in 24h
          </div>
        </div>
        
        <div className="users-section">
          <div className="users-title">
            👥 Online Users ({users.length})
          </div>
          <UserList users={users} currentUser={username} />
        </div>

        <div className="leave-room-section">
          <button 
            onClick={handleLeaveRoom}
            className="leave-room-button"
          >
            🚪 Leave Room
          </button>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="chat-area">
        {error && <div className="error" style={{ margin: '20px' }}>{error}</div>}
        
        <div className="chat-messages">
          {loading ? (
            <div className="loading">
              <span>Loading messages...</span>
            </div>
          ) : (
            messages.map((message, index) => (
              <MessageBubble 
                key={index} 
                message={message} 
                theme={theme}
                isCurrentUser={message.username === username}
              />
            ))
          )}
          
          {/* Typing indicator */}
          {typing.length > 0 && (
            <div className="typing-indicator">
              <span>{typing.join(', ')} {typing.length === 1 ? 'is' : 'are'} typing</span>
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          onTyping={handleTyping}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage;
