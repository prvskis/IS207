// Quản lý trạng thái đăng nhập
import { createContext, useState, useEffect } from "react";
import { users } from "../data/users";

// 1️⃣ Tạo context
export const AuthContext = createContext();

// 2️⃣ Provider để bọc ứng dụng
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Lưu thông tin người dùng

  // Load user từ localStorage khi khởi động ứng dụng
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Hàm đăng nhập giả lập
  const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
