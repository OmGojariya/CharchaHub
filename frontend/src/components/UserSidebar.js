import React, { useState, useEffect } from 'react';

const UserSidebar = ({ roomInfo, connectedUsers, currentUser }) => {
  const [users, setUsers] = useState(new Set());

  useEffect(() => {
    if (currentUser) {
      setUsers(prev => new Set([...prev, currentUser.username]));
    }
  }, [currentUser]);

  // In a real app, you'd track users joining/leaving via WebSocket events
  // For now, we'll just show the current user
  const userList = Array.from(users);

  return (
    <div className="chat-sidebar">
      <div className="room-info">
        <h3>{roomInfo?.roomName || 'Chat Room'}</h3>
        <p>Room expires in 24 hours</p>
      </div>
      
      <div className="online-users">
        <h4>Online Users ({userList.length})</h4>
        <ul className="user-list">
          {userList.map((username, index) => (
            <li key={index} className="user-item">
              <span className="user-avatar">
                {username === currentUser?.username ? currentUser.avatar : '👤'}
              </span>
              <span className="user-name">
                {username}
                {username === currentUser?.username && ' (You)'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;
