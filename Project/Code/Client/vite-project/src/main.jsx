import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MentorRegistrationPage from "./pages/MentorRegistration/MentorRegistrationPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import ClassesPage from "./pages/ClassPage/ClassesPage";
import ClassSettingsPage from "./pages/ClassSettingsPage/ClassSettingsPage";
import ProtectedRoute from "./router/ProtectedRoute";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* ✅ Trang đăng nhập mặc định */}
        <Route path="/" element={<LoginPage />} />

        {/* ✅ Đăng ký người dùng */}
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Trang chủ - chỉ truy cập nếu đã đăng nhập */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Đăng ký Mentor - ai cũng vào được */}
        <Route path="/register-mentor" element={<MentorRegistrationPage />} />

        {/* ✅ Các trang Sidebar */}
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <LibraryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <ClassesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/class-settings"
          element={
            <ProtectedRoute>
              <ClassSettingsPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ Nếu không trùng route nào → quay về login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
