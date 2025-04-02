import { users } from './users';

// Trạng thái friendship
export const FriendshipStatus = {
  PENDING: 'pending',    // Đã gửi lời mời
  ACCEPTED: 'accepted',  // Đã là bạn bè
  NONE: 'none'          // Chưa có mối quan hệ
};

// Danh sách bạn bè và lời mời kết bạn
export const friendships = [
  {
    id: 1,
    user1Id: 101,  // Quốc Đạt
    user2Id: 102,  // Nguyễn Văn A
    status: FriendshipStatus.ACCEPTED,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000 // 7 ngày trước
  },
  {
    id: 2,
    user1Id: 103,  // Trần Thị B
    user2Id: 101,  // Quốc Đạt
    status: FriendshipStatus.PENDING,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000 // 2 ngày trước
  },
  {
    id: 3,
    user1Id: 101,  // Quốc Đạt
    user2Id: 104,  // Lê Văn C
    status: FriendshipStatus.PENDING,
    createdAt: Date.now() - 24 * 60 * 60 * 1000 // 1 ngày trước
  },
  {
    id: 4,
    user1Id: 105,  // Phạm Thị D
    user2Id: 101,  // Quốc Đạt
    status: FriendshipStatus.ACCEPTED,
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000 // 14 ngày trước
  }
];

// Hàm helper để lấy trạng thái friendship giữa 2 user
export const getFriendshipStatus = (userId1, userId2, friendshipsList) => {
  const friendship = friendshipsList.find(
    f => (f.user1Id === userId1 && f.user2Id === userId2) || 
         (f.user1Id === userId2 && f.user2Id === userId1)
  );
  return friendship ? friendship.status : FriendshipStatus.NONE;
};

// Hàm helper để lấy danh sách bạn bè của một user
export const getFriendList = (userId, friendshipsList) => {
  const friendIds = friendshipsList
    .filter(f => 
      (f.user1Id === userId || f.user2Id === userId) && 
      f.status === FriendshipStatus.ACCEPTED
    )
    .map(f => {
      const friendId = f.user1Id === userId ? f.user2Id : f.user1Id;
      return friendId;
    });

  return friendIds.map(friendId => users.find(user => user.id === friendId));
};

// Hàm helper để lấy danh sách lời mời kết bạn đã nhận
export const getReceivedFriendRequests = (userId, friendshipsList) => {
  return friendshipsList
    .filter(f => 
      f.user2Id === userId && 
      f.status === FriendshipStatus.PENDING
    );
};

// Hàm helper để lấy danh sách lời mời kết bạn đã gửi
export const getSentFriendRequests = (userId, friendshipsList) => {
  return friendshipsList
    .filter(f => 
      f.user1Id === userId && 
      f.status === FriendshipStatus.PENDING
    );
}; 