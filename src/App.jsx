import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login"; 
import Navbar from "./components/Navbar";
import EditProfile from "./pages/EditProfile";
import { FriendProvider } from "./context/FriendContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <FriendProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </FriendProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
