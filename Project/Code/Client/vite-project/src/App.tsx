import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import MentorRegistrationPage from './pages/MentorRegistration/MentorRegistrationPage'; // 1. Import trang mới

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* 2. Thêm Route mới cho trang đăng ký */}
        <Route path="/register-mentor" element={<MentorRegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;