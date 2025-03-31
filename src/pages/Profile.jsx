import { useParams, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { posts } from "../data/posts";
import { users } from "../data/users";
import { AuthContext } from "../context/AuthContext";
import { usePostActions } from "../hooks/usePostActions";
import { FaEdit } from 'react-icons/fa';
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import FriendButton from "../components/FriendButton";
import ErrorBoundary from "../components/ErrorBoundary";
import "./Profile.css";

const ProfileContent = () => {
  const { userId } = useParams();
  const numericUserId = Number(userId);
  const { user: currentUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const { allPosts, handleLike, handleComment, handleDelete, handleCreatePost } = usePostActions();
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Tìm thông tin người dùng từ danh sách users
    const foundUser = users.find((u) => u.id === numericUserId);
    setUser(foundUser);
  }, [numericUserId]);

  useEffect(() => {
    if (numericUserId) {
      setUserPosts(allPosts.filter((post) => post.userId === numericUserId));
    }
  }, [numericUserId, allPosts]);

  const handleEditProfile = () => {
    setEditedBio(user?.bio || "");
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!user) return;
    
    const userIndex = users.findIndex((u) => u.id === numericUserId);
    if (userIndex !== -1) {
      users[userIndex].bio = editedBio;
      setUser({...user, bio: editedBio});
    }
    setIsEditing(false);
  };

  if (!currentUser) {
    return <div className="profile-message">Vui lòng đăng nhập để xem trang này</div>;
  }

  if (!user) {
    return <div className="profile-message">Không tìm thấy người dùng</div>;
  }

  const isOwnProfile = currentUser?.id === numericUserId;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="avatar" className="profile-avatar" />
        <h2>{user.name || "Người dùng ẩn danh"}</h2>
        <p>Bio: {user.bio || "Chưa cập nhật tiểu sử."}</p>
        {!isOwnProfile && (
          <FriendButton 
            currentUserId={currentUser.id} 
            targetUserId={numericUserId} 
          />
        )}
        {isOwnProfile && (
          <Link to="/edit-profile" className="edit-profile-btn">
            <FaEdit />
            Chỉnh sửa thông tin
          </Link>
        )}
      </div>

      <div className="profile-posts">
        {isOwnProfile && (
          <CreatePost onCreatePost={handleCreatePost} />
        )}
        <h3>Bài viết của {user.name}</h3>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onDelete={isOwnProfile ? handleDelete : undefined}
            />
          ))
        ) : (
          <p>Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <ErrorBoundary>
      <ProfileContent />
    </ErrorBoundary>
  );
};

export default Profile;
