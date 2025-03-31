import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Nếu đã đăng nhập, chuyển hướng về trang chủ
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/");
    } else {
      setError("Email hoặc mật khẩu không chính xác");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

// CSS đơn giản
const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto" },
  input: { marginBottom: "10px", padding: "8px", fontSize: "16px" },
  button: { background: "#007bff", color: "white", padding: "10px", border: "none", cursor: "pointer" },
};

export default Login;
