import { useState } from 'react';
import { IoClose, IoSend } from 'react-icons/io5';
import './ChatWindow.css';

const ChatWindow = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    // Dữ liệu mẫu, sau này sẽ được thay thế bằng dữ liệu thực từ API
    {
      id: 1,
      senderId: 1,
      text: "Xin chào!",
      timestamp: "10:30"
    },
    {
      id: 2,
      senderId: 2,
      text: "Chào bạn!",
      timestamp: "10:31"
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 1, // ID của người dùng hiện tại
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-user-info">
          <img 
            src="https://via.placeholder.com/40" 
            alt="User avatar" 
            className="chat-avatar"
          />
          <div className="chat-user-details">
            <h4>Người dùng</h4>
            <span className="online-status">Đang hoạt động</span>
          </div>
        </div>
        <button className="close-chat" onClick={onClose}>
          <IoClose />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.senderId === 1 ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              {msg.text}
              <span className="message-time">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" disabled={!message.trim()}>
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow; 