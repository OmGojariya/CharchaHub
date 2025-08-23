const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const roomApi = {
  createRoom: async (roomName, roomKey) => {
    const response = await fetch(`${API_BASE_URL}/room/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomName, roomKey }),
    });
    return response.json();
  },

  findRoomByKey: async (roomKey) => {
    const response = await fetch(`${API_BASE_URL}/room/find/${roomKey}`);
    return response.json();
  },

  joinRoom: async (roomId, roomKey, username, avatar) => {
    const response = await fetch(`${API_BASE_URL}/room/join/${roomId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomKey, username, avatar }),
    });
    return response.json();
  },

  getMessages: async (roomId) => {
    const response = await fetch(`${API_BASE_URL}/room/${roomId}/messages`);
    return response.json();
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  getImageUrl: (imageId) => {
    return `${API_BASE_URL}/upload/image/${imageId}`;
  },
};
