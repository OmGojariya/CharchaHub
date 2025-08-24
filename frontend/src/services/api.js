// Use environment variable with fallback to production URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://charchahub-pmsn.onrender.com/api';

console.log('CharchaHub API URL:', API_BASE_URL, 'ENV:', process.env.NODE_ENV);

export const roomApi = {
  createRoom: async (roomName, roomKey) => {
    try {
      console.log('Creating room with URL:', `${API_BASE_URL}/room/create`);
      const response = await fetch(`${API_BASE_URL}/room/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomName, roomKey }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Create room error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      // Return a structured error response
      return {
        success: false,
        message: `Network Error: ${error.message}. Please check your internet connection and try again.`,
        error: error.name
      };
    }
  },

  findRoomByKey: async (roomKey) => {
    try {
      console.log('Finding room with URL:', `${API_BASE_URL}/room/find/${roomKey}`);
      const response = await fetch(`${API_BASE_URL}/room/find/${roomKey}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Find room error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      // Return a structured error response
      return {
        success: false,
        message: `Network Error: ${error.message}. Please check your internet connection and try again.`,
        error: error.name
      };
    }
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
