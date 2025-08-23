import React from 'react';
import { formatTimestamp } from '../utils/helpers';
import { getAvatarById } from '../utils/avatars';
import { roomApi } from '../services/api';

const MessageBubble = ({ message, theme, isCurrentUser }) => {
  const renderContent = () => {
    if (message.type === 'IMAGE') {
      return (
        <div className="image-content-wrapper">
          <div className="message-content">{message.content}</div>
          <img
            src={roomApi.getImageUrl(message.imageUrl || message.content)}
            alt=""
            className="message-image"
            onClick={() => window.open(roomApi.getImageUrl(message.imageUrl || message.content), '_blank')}
          />
        </div>
      );
    } 

    // Default text rendering with line breaks
    return (
      <div className="message-content">
        {message.content.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < message.content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderAvatar = (avatar) => {
    // Handle different avatar formats
    if (typeof avatar === 'object' && avatar?.svg) {
      return <div dangerouslySetInnerHTML={{ __html: avatar.svg }} />;
    } else if (typeof avatar === 'string') {
      // Check if it's an avatar ID - lookup in avatar data
      const avatarData = getAvatarById(avatar);
      if (avatarData) {
        return <div dangerouslySetInnerHTML={{ __html: avatarData.svg }} />;
      }
      // Fallback to string (emoji)
      return avatar;
    }
    return '😄'; // Default fallback
  };

  const getBubbleClass = () => {
    let classes = 'message-bubble';
    
    if (message.type === 'IMAGE') {
      classes += ' image-message';
    }
    
    if (isCurrentUser) {
      classes += ' current-user';
    }
    
    return classes;
  };

  return (
    <div className={getBubbleClass()}>
      <div className="message-header">
        <div className="message-avatar">
          {renderAvatar(message.avatar)}
        </div>
        <span className="message-username">
          {message.username}
          {isCurrentUser && ' (You)'}
        </span>
        <span className="message-timestamp">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
      {renderContent()}
    </div>
  );
};

export default MessageBubble;
