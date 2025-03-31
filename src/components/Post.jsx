import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import CommentSection from "./CommentSection";
import "./Post.css";

const Post = ({ post, onLike, onComment, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

  const handleDelete = () => {
    onDelete(post.id);
    setShowDeleteModal(false);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = post.commentList.filter(comment => comment.id !== commentId);
    onComment(post.id, "", commentId);
  };

  const handleEditComment = (commentId, newContent) => {
    const updatedComments = post.commentList.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content: newContent };
      }
      return comment;
    });
    onComment(post.id, newContent, commentId);
  };

  return (
    <>
      <div className="post">
        <div className="post-header">
          <div className="post-header-left">
            <img src={post.avatar} alt={post.user} className="avatar" />
            <div className="post-info">
              <Link to={`/profile/${post.userId}`} className="user-link">
                <h3>{post.user}</h3>
              </Link>
              <span className="post-time">{formatTime(post.createdAt)}</span>
            </div>
          </div>
          {user && user.id === post.userId && (
            <button 
              onClick={() => setShowDeleteModal(true)} 
              className="delete-button" 
              title="Xóa bài viết"
            >
              <FaTrash />
            </button>
          )}
        </div>

        <div className="post-content">
          <p className="post-content-text">{post.content}</p>
          {post.image && <img src={post.image} alt="post" className="post-image" />}
        </div>

        <div className="post-actions">
          <button
            className={`action-button ${post.likedBy.includes(user?.id) ? "liked" : ""}`}
            onClick={() => onLike(post.id, post.likedBy.includes(user?.id))}
          >
            {post.likedBy.includes(user?.id) ? (
              <FaHeart className="heart-icon" />
            ) : (
              <FaRegHeart className="heart-icon" />
            )}
            <span>{post.likes}</span>
          </button>
          <button className="action-button" onClick={toggleComments}>
            <FaRegComment className="comment-icon" />
            <span>{post.commentList?.length || 0}</span>
          </button>
        </div>

        {showComments && (
          <CommentSection 
            postId={post.id} 
            comments={post.commentList || []} 
            onComment={onComment}
            onDeleteComment={handleDeleteComment}
            onEditComment={handleEditComment}
          />
        )}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Xóa bài viết</h3>
            <p>Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.</p>
            <div className="modal-buttons">
              <button 
                className="modal-button cancel-button" 
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button 
                className="modal-button confirm-button" 
                onClick={handleDelete}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post; 