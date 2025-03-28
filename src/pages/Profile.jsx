import { useParams, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { posts } from "../data/posts";
import { users } from "../data/users";
import { AuthContext } from "../context/AuthContext";
import { FaEdit } from 'react-icons/fa';
import Post from "../components/Post";
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const numericUserId = Number(userId);
  const { user: currentUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  // Tìm thông tin người dùng từ danh sách users
  const user = users.find((u) => u.id === numericUserId);
  const isOwnProfile = currentUser?.id === numericUserId;

  // Cập nhật userPosts khi userId thay đổi
  useEffect(() => {
    setUserPosts(posts.filter((post) => post.userId === numericUserId));
  }, [numericUserId]);

  const handleEditProfile = () => {
    setEditedBio(user?.bio || "");
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Cập nhật bio trong danh sách users
    const userIndex = users.findIndex((u) => u.id === numericUserId);
    if (userIndex !== -1) {
      users[userIndex].bio = editedBio;
    }
    setIsEditing(false);
  };

  const handleLike = (id, isLiked) => {
    if (!currentUser) return;

    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: isLiked ? post.likes - 1 : post.likes + 1,
              likedBy: isLiked
                ? post.likedBy.filter((userId) => userId !== currentUser.id)
                : [...post.likedBy, currentUser.id],
            }
          : post
      )
    );

    // Cập nhật trong mảng posts gốc
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      if (isLiked) {
        posts[postIndex].likes--;
        posts[postIndex].likedBy = posts[postIndex].likedBy.filter(
          (userId) => userId !== currentUser.id
        );
      } else {
        posts[postIndex].likes++;
        posts[postIndex].likedBy.push(currentUser.id);
      }
    }
  };

  const handleComment = (id, commentData) => {
    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: post.comments + 1,
              commentList: [...(post.commentList || []), commentData],
            }
          : post
      )
    );

    // Cập nhật trong mảng posts gốc
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      posts[postIndex].comments++;
      posts[postIndex].commentList = [
        ...(posts[postIndex].commentList || []),
        commentData,
      ];
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user?.avatar} alt="avatar" className="profile-avatar" />
        <h2>{user?.name || "Người dùng ẩn danh"}</h2>
        <p>Bio: {user?.bio || "Chưa cập nhật tiểu sử."}</p>
        {isOwnProfile && (
          <Link to="/edit-profile" className="edit-profile-btn">
            <FaEdit />
            Chỉnh sửa thông tin
          </Link>
        )}
      </div>

      <div className="profile-posts">
        <h3>Bài viết của {user?.name}</h3>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))
        ) : (
          <p>Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
