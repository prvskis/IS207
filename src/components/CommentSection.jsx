import Comment from "./Comment";
import AddComment from "./AddComment";
import "./CommentSection.css";

const CommentSection = ({ postId, comments, onComment, onDeleteComment, onEditComment }) => {
  // Kiểm tra và lọc ra những comment hợp lệ (có id)
  const validComments = comments.filter(comment => comment && comment.id);

  return (
    <div className="comments-container">
      <div className="comments-list">
        {validComments.map((comment) => (
          <Comment 
            key={`${postId}-${comment.id}`}
            comment={comment} 
            onDelete={onDeleteComment}
            onEdit={onEditComment}
          />
        ))}
      </div>
      <AddComment postId={postId} onComment={onComment} />
    </div>
  );
};

export default CommentSection; 