export const avatarData = [
  {
    id: 'avatar1',
    svg: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#FFD93D"/>
      <circle cx="15" cy="16" r="3" fill="#000"/>
      <circle cx="25" cy="16" r="3" fill="#000"/>
      <path d="M12 25 Q20 32 28 25" stroke="#000" stroke-width="2" fill="none"/>
    </svg>`,
    name: 'Happy'
  },
  {
    id: 'avatar2', 
    svg: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#FF6B6B"/>
      <circle cx="15" cy="16" r="3" fill="#000"/>
      <circle cx="25" cy="16" r="3" fill="#000"/>
      <ellipse cx="20" cy="25" rx="4" ry="2" fill="#000"/>
    </svg>`,
    name: 'Cool'
  },
  {
    id: 'avatar3',
    svg: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#4ECDC4"/>
      <circle cx="15" cy="16" r="3" fill="#000"/>
      <circle cx="25" cy="16" r="3" fill="#000"/>
      <rect x="16" y="22" width="8" height="6" rx="3" fill="#000"/>
    </svg>`,
    name: 'Surprised'
  },
  {
    id: 'avatar4',
    svg: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#A8E6CF"/>
      <circle cx="15" cy="16" r="2" fill="#000"/>
      <circle cx="25" cy="16" r="2" fill="#000"/>
      <path d="M15 25 Q20 20 25 25" stroke="#000" stroke-width="2" fill="none"/>
    </svg>`,
    name: 'Wink'
  },
  {
    id: 'avatar5',
    svg: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#FFB3BA"/>
      <path d="M10 15 L15 20 L10 25 Z" fill="#000"/>
      <path d="M30 15 L25 20 L30 25 Z" fill="#000"/>
      <circle cx="20" cy="25" r="3" fill="#000"/>
    </svg>`,
    name: 'Sleepy'
  },
  {
    id: 'avatar6',
    svg: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#DDA0DD"/>
      <circle cx="15" cy="16" r="3" fill="#000"/>
      <circle cx="25" cy="16" r="3" fill="#000"/>
      <path d="M28 25 Q20 18 12 25" stroke="#000" stroke-width="2" fill="none"/>
    </svg>`,
    name: 'Sad'
  },
  {
    id: 'boy1',
    name: 'Happy Boy',
    svg: `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#FFE0BD"/><circle cx="15" cy="16" r="2" fill="#000"/><circle cx="25" cy="16" r="2" fill="#000"/><path d="M13 23 Q20 30 27 23" stroke="#000" stroke-width="2" fill="none"/><path d="M10 10 Q20 3 30 10" fill="#8B4513"/></svg>`
  },
  {
    id: 'girl1',
    name: 'Happy Girl',
    svg: `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#FFE0BD"/><circle cx="15" cy="16" r="2" fill="#000"/><circle cx="25" cy="16" r="2" fill="#000"/><path d="M13 23 Q20 30 27 23" stroke="#000" stroke-width="2" fill="none"/><path d="M7 8 Q20 0 33 8 Q20 13 7 8" fill="#FF69B4"/></svg>`
  }
];

// Helper function to get avatar by ID
export const getAvatarById = (id) => {
  return avatarData.find(avatar => avatar.id === id);
};

export const getRandomAvatar = () => {
  return avatarData[Math.floor(Math.random() * avatarData.length)];
};

export const AvatarSVG = ({ avatarData, size = 40 }) => {
  if (!avatarData || !avatarData.svg) {
    return <span>😄</span>;
  }
  
  return (
    <div 
      dangerouslySetInnerHTML={{ 
        __html: avatarData.svg.replace(/width="40" height="40"/, `width="${size}" height="${size}"`) 
      }}
    />
  );
};
