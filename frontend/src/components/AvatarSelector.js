import React from 'react';
import { AVATARS } from '../utils/helpers';

const AvatarSelector = ({ selectedAvatar, onAvatarSelect }) => {
  return (
    <div className="form-group">
      <label>Choose Your Avatar:</label>
      <div className="avatar-selection">
        {AVATARS.map((avatar, index) => (
          <div
            key={index}
            className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
            onClick={() => onAvatarSelect(avatar)}
          >
            {avatar}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
