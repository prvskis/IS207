// Quản lý danh sách bạn bè

import { createContext, useContext, useState, useCallback } from 'react';
import { 
  FriendshipStatus, 
  friendships as initialFriendships,
  getFriendshipStatus,
  getFriendList,
  getReceivedFriendRequests,
  getSentFriendRequests
} from '../data/friendsData';

const FriendContext = createContext();

export function FriendProvider({ children }) {
  const [friendships, setFriendships] = useState(initialFriendships);

  // Gửi lời mời kết bạn
  const sendFriendRequest = useCallback((userId1, userId2) => {
    const newFriendship = {
      id: friendships.length + 1,
      user1Id: userId1,
      user2Id: userId2,
      status: FriendshipStatus.PENDING,
      createdAt: Date.now()
    };
    setFriendships(prev => [...prev, newFriendship]);
  }, [friendships.length]);

  // Chấp nhận lời mời kết bạn
  const acceptFriendRequest = useCallback((friendshipId) => {
    setFriendships(prev => 
      prev.map(f => 
        f.id === friendshipId 
          ? { ...f, status: FriendshipStatus.ACCEPTED }
          : f
      )
    );
  }, []);

  // Từ chối lời mời kết bạn
  const declineFriendRequest = useCallback((friendshipId) => {
    setFriendships(prev => prev.filter(f => f.id !== friendshipId));
  }, []);

  // Hủy kết bạn
  const unfriend = useCallback((friendshipId) => {
    setFriendships(prev => prev.filter(f => f.id !== friendshipId));
  }, []);

  // Hủy lời mời kết bạn đã gửi
  const cancelFriendRequest = useCallback((friendshipId) => {
    setFriendships(prev => prev.filter(f => f.id !== friendshipId));
  }, []);

  // Lấy trạng thái friendship giữa 2 user
  const getStatus = useCallback((userId1, userId2) => {
    return getFriendshipStatus(userId1, userId2, friendships);
  }, [friendships]);

  // Lấy danh sách bạn bè của một user
  const getFriends = useCallback((userId) => {
    return getFriendList(userId, friendships);
  }, [friendships]);

  // Lấy danh sách lời mời kết bạn đã nhận
  const getReceivedRequests = useCallback((userId) => {
    return getReceivedFriendRequests(userId, friendships);
  }, [friendships]);

  // Lấy danh sách lời mời kết bạn đã gửi
  const getSentRequests = useCallback((userId) => {
    return getSentFriendRequests(userId, friendships);
  }, [friendships]);

  const value = {
    friendships,
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    unfriend,
    cancelFriendRequest,
    getStatus,
    getFriends,
    getReceivedRequests,
    getSentRequests
  };

  return (
    <FriendContext.Provider value={value}>
      {children}
    </FriendContext.Provider>
  );
}

export function useFriend() {
  const context = useContext(FriendContext);
  if (!context) {
    throw new Error('useFriend must be used within a FriendProvider');
  }
  return context;
}
