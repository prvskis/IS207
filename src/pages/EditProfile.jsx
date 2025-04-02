import { useState, useContext, useEffect } from "react";
import { users } from "../data/users";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import "./EditProfile.css";

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState("");

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem("loggedInUser");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setPreview(parsedUser.avatar);
        setUpdatedUser({
          name: parsedUser.name,
          bio: parsedUser.bio || "",
          avatar: parsedUser.avatar,
        });
        setIsLoading(false);
      } else {
        navigate("/login");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleImageChange = (e) => {    
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setUpdatedUser({ ...updatedUser, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!savedUser) return; 

    const userIndex = users.findIndex((u) => u.id === savedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      localStorage.setItem("loggedInUser", JSON.stringify({ ...savedUser, ...updatedUser }));
    }
    navigate(`/profile/${savedUser.id}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div className="edit-profile-container">Đang tải...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h2>Chỉnh sửa hồ sơ</h2>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}>
        <div className="avatar-upload">
          <img src={preview} alt="Avatar preview" className="avatar-preview" />
          <label htmlFor="avatar-upload" className="update-avatar-button">
            <FaCamera className="camera-icon" />
          </label>
          <input
            id="avatar-upload"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <label htmlFor="user-name">Tên:</label>
        <input
          id="user-name"
          name="name"
          type="text"
          value={updatedUser.name}
          onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
        />
        
        <label htmlFor="user-bio">Bio:</label>
        <textarea
          id="user-bio"
          name="bio"
          value={updatedUser.bio}
          onChange={(e) => setUpdatedUser({ ...updatedUser, bio: e.target.value })}
        />
        
        <div className="button-group">
          <button type="submit" className="edit-profile-button">Lưu</button>
          <button type="button" onClick={handleCancel} className="edit-profile-button cancel">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

