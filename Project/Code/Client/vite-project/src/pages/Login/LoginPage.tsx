import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../../assets/bk-logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ Đặt bên trong component

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/login", {
        username: email,
        password: password,
      });

      if (res.status === 200) {
        setMessage("Đăng nhập thành công!");
        // ✅ Lưu thông tin vào localStorage
        localStorage.setItem("user", JSON.stringify({ username: email }));
        // ✅ Chuyển hướng sau 0.8s
        setTimeout(() => navigate("/"), 800);
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="BK Tutor Logo" className={styles.logo} />
          <span className={styles.logoText}>TUTOR</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Đăng nhập
          </button>
        </form>

        {message && (
          <p style={{ textAlign: "center", color: "#333", marginTop: "10px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
