import { useState } from 'react';
import { useFriend } from '../context/FriendContext';
import { users } from '../data/users';
import './FriendRequests.css';

export default function FriendRequests({ currentUserId }) {
  const { getReceivedRequests, acceptFriendRequest, declineFriendRequest } = useFriend();
  const [showRequests, setShowRequests] = useState(false);

  const requests = getReceivedRequests(currentUserId);

  // Lấy thông tin user từ users.js
  const getUserInfo = (userId) => {
    const user = users.find(u => u.id === userId);
    return user || { user: 'Người dùng', avatar: 'https://i.pravatar.cc/150?img=1' };
  };

  const handleAccept = (friendshipId) => {
    acceptFriendRequest(friendshipId);
  };

  const handleDecline = (friendshipId) => {
    declineFriendRequest(friendshipId);
  };

  if (requests.length === 0) return null;

  return (
    <div className="friend-requests">
      <div 
        className="requests-header" 
        onClick={() => setShowRequests(!showRequests)}
      >
        <span className="requests-count">{requests.length}</span>
        <span className="requests-title">Lời mời kết bạn</span>
        <span className={`requests-arrow ${showRequests ? 'up' : 'down'}`}>
          ▼
        </span>
      </div>

      {showRequests && (
        <div className="requests-list">
          {requests.map(request => {
            const sender = getUserInfo(request.user1Id);
            return (
              <div key={request.id} className="request-item">
                <img 
                  src={sender.avatar} 
                  alt={sender.user} 
                  className="request-avatar"
                />
                <div className="request-info">
                  <span className="request-name">{sender.user}</span>
                  <span className="request-time">
                    {new Date(request.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
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
            );
          })}
        </div>
      )}
    </div>
  );
} 