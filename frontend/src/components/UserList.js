import React from 'react';
import { getAvatarById } from '../utils/avatars';

const UserList = ({ users, currentUser }) => {
  const renderAvatar = (avatar) => {
    if (typeof avatar === 'object' && avatar?.svg) {
      return <div dangerouslySetInnerHTML={{ __html: avatar.svg }} />;
    } else if (typeof avatar === 'string') {
      const avatarData = getAvatarById(avatar);
      if (avatarData) {
        return <div dangerouslySetInnerHTML={{ __html: avatarData.svg }} />;
      }
      return avatar;
    }
    return '😄';
  };

  return (
    <div className="users-list">
      {users.map((user, index) => (
        <div key={index} className="user-item">
          <div className="user-avatar">
            {renderAvatar(user.avatar)}
          </div>
          <div className="user-name">
            {user.username} {user.username === currentUser && '(You)'}
          </div>
          {user.isOnline && <div className="online-indicator"></div>}
        </div>
      ))}
    </div>
  );
};

export default UserList;
