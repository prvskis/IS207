import { useState, useContext } from "react";
import { posts } from "../data/posts";
import { FaCamera, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import "./CreatePost.css";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !image) {
      setError("Vui lòng nhập nội dung hoặc chọn ảnh!");
      return;
    }

    setError("");

    const newPost = {
      id: posts.length + 1,
      userId: user.id,
      user: user.name,
      avatar: user.avatar,
      content,
      image: preview,
      likes: 0,
      comments: 0,
      createdAt: Date.now(),
      likedBy: [],
      commentList: [],
    };

    posts.unshift(newPost);
    setContent("");
    setImage(null);
    setPreview("");
    onPostCreated();
  };

  return (
    <div className="create-post">
      {!user ? (
        <p>Hãy đăng nhập để đăng bài!</p>
      ) : (
        <>
          <h3>Đăng bài viết</h3>
          <textarea
            id="post-content"
            name="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì?"
            className="post-content"
          />

          <div className="post-actions">
            <div className="upload-container">
              <label htmlFor="file-upload" className="upload-button">
                <FaCamera className="camera-icon" />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <button onClick={handleSubmit} className="create-post-button">
              Đăng bài
            </button>
          </div>
          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
              <button className="remove-image" onClick={() => setPreview("")}>
                <FaTimes className="remove-icon" />
              </button>
            </div>
          )}
          

          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
};

export default CreatePost;
