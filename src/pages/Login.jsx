import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/");
    } else {
      setError("Email hoặc mật khẩu không chính xác");
    }
  };

  return (
    <div style={styles.container} className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Đăng nhập</button>
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
