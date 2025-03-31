import { useFriend } from '../context/FriendContext';
import './FriendButton.css';

export default function FriendButton({ currentUserId, targetUserId }) {
  const { 
    getStatus, 
    sendFriendRequest, 
    unfriend, 
    cancelFriendRequest,
    acceptFriendRequest,
    friendships 
  } = useFriend();
  
  const status = getStatus(currentUserId, targetUserId);

  // Kiểm tra xem currentUser có phải là người nhận request không
  const isReceiver = friendships.some(
    f => f.user1Id === targetUserId && 
        f.user2Id === currentUserId && 
        f.status === 'pending'
  );

  // Kiểm tra xem currentUser có phải là người gửi request không
  const isSender = friendships.some(
    f => f.user1Id === currentUserId && 
        f.user2Id === targetUserId && 
        f.status === 'pending'
  );

  const handleClick = () => {
    if (!currentUserId || !targetUserId) {
      console.error('Missing user IDs');
      return;
    }

    switch (status) {
      case 'none':
        sendFriendRequest(currentUserId, targetUserId);
        break;
      case 'accepted':
        // Tìm friendship ID để unfriend
        const friendship = friendships.find(
          f => (f.user1Id === currentUserId && f.user2Id === targetUserId) ||
               (f.user1Id === targetUserId && f.user2Id === currentUserId)
        );
        if (friendship) {
          unfriend(friendship.id);
        } else {
          console.error('Friendship not found');
        }
        break;
      case 'pending':
        // Nếu là người nhận request
        if (isReceiver) {
          const request = friendships.find(
            f => f.user1Id === targetUserId && f.user2Id === currentUserId
          );
          if (request) {
            acceptFriendRequest(request.id);
          } else {
            console.error('Friend request not found');
          }
        }
        // Nếu là người gửi request
        else if (isSender) {
          const request = friendships.find(
            f => f.user1Id === currentUserId && f.user2Id === targetUserId
          );
          if (request) {
            cancelFriendRequest(request.id);
          } else {
            console.error('Friend request not found');
          }
        }
        break;
      default:
        console.error('Invalid friendship status:', status);
        break;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'none':
        return 'Kết bạn';
      case 'accepted':
        return 'Hủy kết bạn';
      case 'pending':
        return isReceiver ? 'Chấp nhận lời mời' : 'Hủy lời mời';
      default:
        return 'Kết bạn';
    }
  };

  const getButtonClass = () => {
    switch (status) {
      case 'none':
        return 'add-friend-btn';
      case 'accepted':
        return 'unfriend-btn';
      case 'pending':
        return isReceiver ? 'accept-friend-btn' : 'cancel-request-btn';
      default:
        return 'add-friend-btn';
    }
  };

  if (!currentUserId || !targetUserId) {
    return null;
  }

  return (
    <button 
      className={getButtonClass()}
      onClick={handleClick}
    >
      {getButtonText()}
    </button>
  );
} 