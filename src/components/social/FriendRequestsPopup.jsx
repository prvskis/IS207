import { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { useFriend } from '../../context/FriendContext';
import { users } from '../../data/users';
import './FriendRequestsPopup.css';

const FriendRequestsPopup = ({ currentUserId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('received'); // 'received' or 'sent'
  const { getReceivedRequests, getSentRequests, acceptFriendRequest, declineFriendRequest, cancelFriendRequest } = useFriend();

  const receivedRequests = getReceivedRequests(currentUserId);
  const sentRequests = getSentRequests(currentUserId);

  // Lấy thông tin user từ users.js
  const getUserInfo = (userId) => {
    const user = users.find(u => u.id === userId);
    return user || { name: 'Người dùng', avatar: 'https://i.pravatar.cc/150?img=1' };
  };

  const handleAccept = (friendshipId) => {
    acceptFriendRequest(friendshipId);
  };

  const handleDecline = (friendshipId) => {
    declineFriendRequest(friendshipId);
  };

  const handleCancel = (friendshipId) => {
    cancelFriendRequest(friendshipId);
  };

  return (
    <>
      <button 
        className="friend-requests-icon" 
        onClick={() => setIsOpen(true)}
      >
        <div className="icon">
          <FaUserFriends />
          {receivedRequests.length > 0 && (
            <span className="requests-badge">{receivedRequests.length}</span>
          )}
        </div>
        <span className="text">Lời mời kết bạn</span>
      </button>

      {isOpen && (
        <div className="popup-overlay" onClick={() => setIsOpen(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Lời mời kết bạn</h2>
              <button 
                className="close-button"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="popup-tabs">
              <button 
                className={`tab-button ${activeTab === 'received' ? 'active' : ''}`}
                onClick={() => setActiveTab('received')}
              >
                Lời mời nhận được
                {receivedRequests.length > 0 && (
                  <span className="tab-badge">{receivedRequests.length}</span>
                )}
              </button>
              <button 
                className={`tab-button ${activeTab === 'sent' ? 'active' : ''}`}
                onClick={() => setActiveTab('sent')}
              >
                Lời mời đã gửi
                {sentRequests.length > 0 && (
                  <span className="tab-badge">{sentRequests.length}</span>
                )}
              </button>
            </div>

            <div className="requests-list">
              {activeTab === 'received' ? (
                receivedRequests.length > 0 ? (
                  receivedRequests.map(request => {
                    const sender = getUserInfo(request.user1Id);
                    return (
                      <div key={request.id} className="request-item">
                        <img 
                          src={sender.avatar} 
                          alt={sender.name} 
                          className="request-avatar"
                        />
                        <div className="request-info">
                          <span className="request-name">{sender.name}</span>
                          <div className="request-actions">
                            <button 
                              className="accept-btn"
                              onClick={() => handleAccept(request.id)}
                            >
                              Chấp nhận
                            </button>
                            <button 
                              className="decline-btn"
                              onClick={() => handleDecline(request.id)}
                            >
                              Từ chối
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-requests">Không có lời mời kết bạn nào</p>
                )
              ) : (
                sentRequests.length > 0 ? (
                  sentRequests.map(request => {
                    const receiver = getUserInfo(request.user2Id);
                    return (
                      <div key={request.id} className="request-item">
                        <img 
                          src={receiver.avatar} 
                          alt={receiver.name} 
                          className="request-avatar"
                        />
                        <div className="request-info">
                          <span className="request-name">{receiver.name}</span>
                          <button 
                            className="cancel-btn"
                            onClick={() => handleCancel(request.id)}
                          >
                            Hủy lời mời
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-requests">Chưa gửi lời mời kết bạn nào</p>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequestsPopup; 