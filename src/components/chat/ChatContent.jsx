import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { conversations } from "../../data/conversations";
import "./ChatContent.css";

const ChatContent = ({ currentUser, selectedFriend, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  
  // Kiểm tra nếu không có currentUser hoặc selectedFriend thì return null
  if (!currentUser?.id || !selectedFriend?.id) {
    console.log("Missing user information:", { currentUser, selectedFriend });
    return null;
  }

  const currentUserId = String(currentUser.id);
  const friendId = String(selectedFriend.id);

  useEffect(() => {
    if (!currentUserId || !friendId) return;

    console.log("Loading conversation for users:", { currentUserId, friendId });

    // Tìm conversation giữa currentUser và selectedFriend
    let conversation = conversations.find(
      (conv) =>
        (conv.user1 === currentUserId && conv.user2 === friendId) ||
        (conv.user1 === friendId && conv.user2 === currentUserId)
    );

    if (!conversation) {
      // Tạo conversation mới nếu chưa có
      conversation = {
        _id: `conv_${currentUserId}_${friendId}`,
        user1: currentUserId,
        user2: friendId,
        messages: []
      };
      conversations.push(conversation);
    }

    console.log("Current conversation:", conversation);
    setCurrentConversation(conversation);
    setMessages(conversation.messages);
  }, [currentUserId, friendId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && currentConversation) {
      const newMessage = {
        sender_id: currentUserId,
        message: message.trim(),
        timestamp: new Date().toISOString(),
        is_read: false
      };

      // Cập nhật tin nhắn trong conversations
      currentConversation.messages.push(newMessage);
      // Cập nhật state để render lại UI
      setMessages([...currentConversation.messages]);
      setMessage("");
    }
  };

  return (
    <div className="chat-content">
      <div className="chat-header">
        <div className="chat-user-info">
          <img
            src={selectedFriend.avatar || "default-avatar.png"}
            alt={selectedFriend.name || "User"}
            className="chat-avatar"
          />
          <span className="chat-name">{selectedFriend.name || "User"}</span>
        </div>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender_id === currentUserId ? "sent" : "received"
            }`}
          >
            <div className="message-content">{msg.message}</div>
            <div className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          autoComplete="off"
        />
        <button type="submit" disabled={!message.trim()}>
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default ChatContent; 