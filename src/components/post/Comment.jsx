import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaEllipsisH } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import "./Comment.css";

const Comment = ({ comment, onDelete, onEdit }) => {
  const { user } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    onDelete(comment.id);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    if (editContent.trim() !== comment.content) {
      onEdit(comment.id, editContent);
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className="comment">
        <Link to={`/profile/${comment.userId}`}>
          <img
            src={comment.avatar}
            alt={comment.username}
            className="comment-avatar"
          />
        </Link>
        <div className="comment-content">
          <div className="comment-header">
            <Link to={`/profile/${comment.userId}`} className="comment-username">
              {comment.username}
            </Link>
            {user && user.id === comment.userId && (
              <div className="comment-menu" ref={menuRef}>
                <button 
                  onClick={() => setShowMenu(!showMenu)} 
                  className="menu-button" 
                  title="Tùy chọn"
                >
                  <FaEllipsisH />
                </button>
                {showMenu && (
                  <div className="menu-dropdown">
                    <button 
                      className="menu-item"
                      onClick={() => {
                        setIsEditing(true);
                        setShowMenu(false);
                      }}
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button 
                      className="menu-item delete"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setShowMenu(false);
                      }}
                    >
                      <FaTrash /> Xóa
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {isEditing ? (
            <div className="edit-comment">
              <textarea
                id={`edit-comment-${comment.id}`}
                name={`edit-comment-${comment.id}`}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="edit-comment-input"
                autoFocus
              />
              <div className="edit-actions">
                <button 
                  type="button"
                  className="cancel-edit"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                >
                  Hủy
                </button>
                <button 
                  type="button"
                  className="save-edit"
                  onClick={handleEdit}
                >
                  Lưu
                </button>
              </div>
            </div>
          ) : (
            <span className="comment-text">{comment.content}</span>
          )}
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Xóa bình luận</h3>
            <p>Bạn có chắc chắn muốn xóa bình luận này không? Hành động này không thể hoàn tác.</p>
            <div className="modal-buttons">
              <button 
                type="button"
                className="modal-button cancel-button" 
                onClick={() => setShowDeleteModal(false)}
              >
                Hủy
              </button>
              <button 
                type="button"
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

export default Comment; 