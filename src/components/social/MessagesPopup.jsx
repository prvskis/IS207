import { useState, useContext, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { AuthContext } from '../../context/AuthContext';
import { useFriend } from '../../context/FriendContext';
import ChatContent from '../chat/ChatContent';
import './MessagesPopup.css';

const MessagesPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { user } = useContext(AuthContext);
  const { getFriends } = useFriend();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (user) {
      const friendsList = getFriends(user.id);
      console.log('Friends list:', friendsList);
      setFriends(friendsList);
    }
  }, [user, getFriends]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedFriend(null);
    }
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleCloseChat = () => {
    setSelectedFriend(null);
  };

  return (
    <div className="messages-popup-container">
      <button 
        className="messages-button" 
        onClick={togglePopup}
      >
        <div className="icon">
          <FaEnvelope />
        </div>
        <span className="text">Tin nhắn</span>
      </button>

      {isOpen && (
        <>
          <div className="messages-overlay" onClick={togglePopup} />
          <div className="messages-popup">
            {/* Cột bên trái - Danh sách bạn bè */}
            <div className="messages-sidebar">
              <div className="messages-header">
                <h3>Tin nhắn</h3>
                <button className="close-messages" onClick={togglePopup}>
                  <IoClose size={24} />
                </button>
              </div>
              <div className="friends-list">
                {friends && friends.length > 0 ? (
                  friends.map((friend) => (
                    <div
                      key={friend.id}
                      className={`friend-item ${selectedFriend?.id === friend.id ? 'active' : ''}`}
                      onClick={() => handleSelectFriend(friend)}
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="friend-avatar"
                      />
                      <span className="friend-name">{friend.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="no-friends-message">
                    Chưa có bạn bè
                  </div>
                )}
              </div>
            </div>
            
            {/* Cột bên phải - Nội dung chat */}
            <div className="chat-area">
              {selectedFriend ? (
                <ChatContent 
                  currentUser={user}
                  selectedFriend={selectedFriend}
                  onClose={handleCloseChat}
                />
              ) : (
                <div className="no-chat-selected">
                  <FaEnvelope size={50} color="#65676b" />
                  <p>Chọn một người bạn để bắt đầu cuộc trò chuyện</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MessagesPopup; 