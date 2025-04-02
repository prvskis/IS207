import { useState } from 'react';
import { useFriend } from '../context/FriendContext';
import { users } from '../data/users';
import './FriendList.css';

export default function FriendList({ currentUserId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMenu, setShowMenu] = useState(null);
  const [error, setError] = useState(null);

  // Kiểm tra currentUserId
  if (!currentUserId) {
    return null;
  }

  try {
    const { getFriends, unfriend, friendships } = useFriend();
    
    // Kiểm tra xem getFriends có tồn tại không
    if (!getFriends) {
      console.error('getFriends is not defined');
      return <div>Đang tải...</div>;
    }

    const friends = getFriends(currentUserId);

    // Kiểm tra xem friends có tồn tại không
    if (!friends) {
      console.error('friends is null/undefined');
      return <div>Đang tải danh sách bạn bè...</div>;
    }

    // Lấy thông tin user từ users.js
    const getUserInfo = (userId) => {
      if (!userId) return { user: 'Người dùng', avatar: 'https://i.pravatar.cc/150?img=1' };
      const user = users.find(u => u.id === userId);
      return user || { user: 'Người dùng', avatar: 'https://i.pravatar.cc/150?img=1' };
    };

    // Lọc bạn bè theo từ khóa tìm kiếm
    const filteredFriends = friends.filter(friendId => {
      if (!friendId) return false;
      const friend = getUserInfo(friendId);
      return friend.user.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleUnfriend = (friendId) => {
      try {
        // Tìm friendship ID để unfriend
        const friendship = friendships.find(
          f => (f.user1Id === currentUserId && f.user2Id === friendId) ||
               (f.user1Id === friendId && f.user2Id === currentUserId)
        );
        if (friendship) {
          unfriend(friendship.id);
          setShowMenu(null);
        }
      } catch (err) {
        console.error('Error in handleUnfriend:', err);
        setError('Không thể hủy kết bạn. Vui lòng thử lại sau.');
      }
    };

    return (
      <div className="friend-list">
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}
        
        <div className="friend-list-header">
          <h2>Bạn bè</h2>
          <div className="friend-count">{friends.length} bạn bè</div>
        </div>

        <div className="friend-search">
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="friends-grid">
          {filteredFriends.map(friendId => {
            if (!friendId) return null;
            const friend = getUserInfo(friendId);
            return (
              <div key={friendId} className="friend-item">
                <img 
                  src={friend.avatar} 
                  alt={friend.user} 
                  className="friend-avatar"
                />
                <div className="friend-info">
                  <span className="friend-name">{friend.user}</span>
                  <button 
                    className="friend-menu-btn"
                    onClick={() => setShowMenu(showMenu === friendId ? null : friendId)}
                  >
                    ...
                  </button>
                </div>
                {showMenu === friendId && (
                  <div className="friend-menu">
                    <button 
                      className="unfriend-btn"
                      onClick={() => handleUnfriend(friendId)}
                    >
                      Hủy kết bạn
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (err) {
    console.error('Error in FriendList:', err);
    return <div>Đã có lỗi xảy ra. Vui lòng tải lại trang.</div>;
  }
} 