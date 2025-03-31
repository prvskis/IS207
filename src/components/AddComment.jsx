import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import "./AddComment.css";

const AddComment = ({ postId, onComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(postId, comment);
      setComment("");
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit} className="comment-form">
        <FaRegComment className="comment-icon" />
        <input
          type="text"
          id={`comment-input-${postId}`}
          name={`comment-${postId}`}
          placeholder="Viết bình luận..."
          value={comment}
          onChange={handleChange}
          className="comment-input"
        />
        <button type="submit" className="comment-button">
          Đăng
        </button>
      </form>
    </div>
  );
};

export default AddComment; 