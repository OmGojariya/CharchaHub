import React, { useState, useRef, useEffect } from 'react';
import { roomApi } from '../services/api';

const ChatInput = ({ onSendMessage, onTyping, theme }) => {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    // Auto-resize textarea
    const textarea = document.querySelector('.message-input');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Handle typing indicator
    if (!isTyping && e.target.value.trim()) {
      setIsTyping(true);
      onTyping?.(true);
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping?.(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage({
        type: 'TEXT',
        content: message.trim()
      });
      setMessage('');
      
      // Clear typing indicator
      setIsTyping(false);
      onTyping?.(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, GIF)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    setIsUploading(true);
    try {
      const response = await roomApi.uploadImage(file);
      if (response.success) {
        onSendMessage({
          type: 'IMAGE',
          content: `📷 ${file.name}`,
          imageUrl: response.data
        });
      } else {
        alert('Failed to upload image: ' + response.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="chat-input-area">
      <div className="input-container">
        <textarea
          className="message-input"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="💬 Type your message... (Shift+Enter for new line)"
          disabled={isUploading}
        />
        
        <div className="input-actions">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="file-input"
            style={{ display: 'none' }}
          />
          
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="action-button file-input-button"
            disabled={isUploading}
            title="Upload Image"
          >
            {isUploading ? '⏳' : '📷'}
          </button>
          
          <button
            type="submit"
            onClick={handleSubmit}
            className="action-button send-button"
            disabled={!message.trim() || isUploading}
            title="Send Message"
          >
            {isUploading ? '⏳' : '➤'}
          </button>
        </div>
      </div>
      
      {isUploading && (
        <div className="upload-status">
          <span>Uploading image...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
