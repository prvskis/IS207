import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import { useFriend } from '../../context/FriendContext';
import './FriendsList.css';

const FriendsList = ({ userId }) => {
  const { getFriends } = useFriend();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friendsList = getFriends(userId);
    setFriends(friendsList);
  }, [userId, getFriends]);

  return (
    <div className="friends-list-container">
      <div className="friends-list-header">
        <FaUserFriends className="friends-icon" />
        <h3>Bạn bè ({friends.length})</h3>
      </div>
      
      {friends.length > 0 ? (
        <div className="friends-grid">
          {friends.map((friend) => (
            <Link 
              to={`/profile/${friend.id}`} 
              key={friend.id} 
              className="friend-card"
            >
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className="friend-avatar" 
              />
              <span className="friend-name">{friend.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-friends">
          <p>Chưa có bạn bè</p>
        </div>
      )}
    </div>
  );
};

export default FriendsList; 