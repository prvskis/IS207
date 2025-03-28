import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { users } from "../data/users";
import { AuthContext } from "../context/AuthContext";
import "./Post.css";

const Post = ({ post, onLike, onComment }) => {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) {
      return "Vừa xong";
    } else if (hours < 1) {
      return `${minutes} phút`;
    } else if (days < 1) {
      return `${hours} giờ`;
    } else {
      const date = new Date(timestamp);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const handleLike = () => {
    if (user) {
      const isLiked = post.likedBy.includes(user.id);
      onLike(post.id, isLiked);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && user) {
      onComment(post.id, {
        userId: user.id,
        content: commentText,
      });
      setCommentText("");
      setShowComments(true);
    }
  };

  const getCommentUserInfo = (userId) => {
    const commentUser = users.find(u => u.id === userId);
    return {
      name: commentUser?.name || "Người dùng",
      avatar: commentUser?.avatar || "https://i.pravatar.cc/150"
    };
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.avatar} alt="avatar" className="avatar" />
        <div className="post-info">
          <Link to={`/profile/${post.userId}`} className="user-link">
            <h3>{post.user}</h3>
          </Link>
          <span className="post-time">{formatTime(post.createdAt)}</span>
        </div>
      </div>

      <div className="post-content">
        <p className="post-content-text">{post.content}</p>
        {post.image && <img src={post.image} alt="post" className="post-image" />}
      </div>

      <div className="post-actions">
        <button className="action-button" onClick={handleLike}>
          <FaHeart className={post.likedBy.includes(user?.id) ? "liked" : ""} />
          <span>{post.likes}</span>
        </button>
        <button
          className="action-button"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment />
          <span>{post.comments}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              placeholder="Viết bình luận..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">Đăng</button>
          </form>

          <div className="comments-list">
            {post.commentList?.map((comment, index) => {
              const commentUser = getCommentUserInfo(comment.userId);
              return (
                <div key={index} className="comment">
                  <img src={commentUser.avatar} alt="avatar" className="comment-avatar" />
                  <div className="comment-content">
                    <Link to={`/profile/${comment.userId}`} className="comment-username">
                      {commentUser.name}
                    </Link>
                    <p>{comment.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post; 