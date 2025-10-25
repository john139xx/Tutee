import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MentorRegistrationPage from "./pages/MentorRegistrationPage/MentorRegistrationPage";
import ProtectedRoute from "./router/ProtectedRoute"; // nếu chưa có thì tạo file này
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ✅ Trang đầu tiên luôn là LoginPage */}
        <Route path="/" element={<LoginPage />} />

        {/* ✅ Khi đã đăng nhập mới vào được trang Home */}
        
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        
        {/* Trang đăng ký mentor */}
        <Route path="/register-mentor" element={<MentorRegistrationPage />} />

        {/* Nếu đường dẫn sai → tự quay lại trang login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);
