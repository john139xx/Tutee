import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/bk-logo.png"; // ✅ thêm logo giống LoginPage

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:4000/register-mentor", formData);
    if (res.status === 200) {
      alert("🎉 Đăng ký mentor thành công!");
      navigate("/home");
    }
  } catch (err: any) {
    if (err.response && err.response.data.message) {
      alert("⚠️ " + err.response.data.message);
    } else {
      alert("❌ Lỗi kết nối đến server!");
    }
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        {/* ✅ Thêm logo + tên thương hiệu */}
        <div className={styles.logoContainer}>
          <img src={logo} alt="BK Mentor Logo" className={styles.logo} />
          <span className={styles.logoText}>BK MENTOR</span>
        </div>

        <h2 className={styles.title}>Tạo tài khoản mới</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.registerButton}>
            Đăng ký
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <p className={styles.loginText}>
          Đã có tài khoản?{" "}
          <span className={styles.loginLink} onClick={() => navigate("/")}>
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
