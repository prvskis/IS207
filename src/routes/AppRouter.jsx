// Khai báo tất cả các tuyến đường
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar /> {/* Hiển thị Navbar trên mọi trang */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
