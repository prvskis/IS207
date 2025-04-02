import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";


const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1 className="navbar-left">
        <Link to="/" className="logo">LOSSLESS</Link>
      </h1>
      <div className="navbar-center">
        <input type="text" placeholder="Tìm kiếm..." className="search-bar" />
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="user-info">
            <img src={user.avatar} alt="Avatar" className="avatar" />
            <Link to={`/profile/${user.id}`} className="username">{user.name}</Link>
            <button onClick={logout} className="logout-btn">
              <FaSignOutAlt className="logout-icon" />
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
};

// CSS inline để tạm thời tạo giao diện
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    color: "white",
  },
  button: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;
