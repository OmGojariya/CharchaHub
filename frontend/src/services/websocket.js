import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
    this.currentRoomId = null;
  }

  connect(roomId, callbacks) {
    this.currentRoomId = roomId; // Store room ID for use in other methods
    // Use environment variable with fallback to production URL
    const apiUrl = process.env.REACT_APP_API_URL || 'https://charchahub-pmsn.onrender.com/api';
    const wsUrl = apiUrl.replace('/api', '/ws');
    console.log('WebSocket connecting to:', wsUrl);
    const socket = new SockJS(wsUrl);

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = () => {
      this.connected = true;
      console.log('Connected to WebSocket');

      this.stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        const messageBody = JSON.parse(message.body);
        
        if (messageBody.type === 'JOIN') {
          callbacks.onUserJoined?.(messageBody);
        } else if (messageBody.type === 'LEAVE') {
          callbacks.onUserLeft?.(messageBody);
        } else if (messageBody.type === 'TYPING') {
          callbacks.onTyping?.([messageBody.username]);
        } else {
          callbacks.onMessage?.(messageBody);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      this.connected = false;
      console.error('STOMP error:', frame);
      callbacks.onError?.(frame);
    };

    this.stompClient.onWebSocketError = (error) => {
      this.connected = false;
      console.error('WebSocket error:', error);
      callbacks.onError?.(error);
    };

    this.stompClient.activate();
  }

  sendMessage(message) {
    if (this.connected && this.stompClient) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify({
          ...message,
          roomId: this.currentRoomId
        })
      });
    } else {
      console.error('WebSocket is not connected');
    }
  }

  addUser(userInfo) {
    if (this.connected && this.stompClient) {
      this.stompClient.publish({
        destination: '/app/chat.addUser',
        body: JSON.stringify({
          ...userInfo,
          roomId: this.currentRoomId,
          type: 'JOIN'
        })
      });
    }
  }

  sendTyping(username, isTyping) {
    if (this.connected && this.stompClient) {
      this.stompClient.publish({
        destination: '/app/chat.typing',
        body: JSON.stringify({
          username,
          typing: isTyping,
          roomId: this.currentRoomId,
          type: 'TYPING'
        })
      });
    }
  }

  leaveRoom(userInfo) {
    if (this.connected && this.stompClient) {
      this.stompClient.publish({
        destination: '/app/chat.leaveRoom',
        body: JSON.stringify({
          ...userInfo,
          roomId: this.currentRoomId,
          type: 'LEAVE'
        })
      });
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.connected = false;
      console.log('Disconnected from WebSocket');
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
