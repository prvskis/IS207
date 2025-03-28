import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* Bọc ứng dụng với AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
