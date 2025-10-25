import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/bk-logo.png";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setIsLoggedIn(!!userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={onToggleSidebar}>
          ☰
        </button>

        <div className={styles.logoContainer}>
          <img src={logo} alt="BK Logo" className={styles.logo} />
          <h1 className={styles.logoText}>TUTOR</h1>
        </div>
      </div>

      <div className={styles.right}>
        {/* ✅ Nếu đã đăng nhập: chỉ hiển thị Đăng ký Mentor + Đăng xuất */}
        {isLoggedIn ? (
          <>
            <button
              className={styles.mentorButton}
              onClick={() => navigate("/register-mentor")}
            >
              Đăng ký Mentor
            </button>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        ) : (
          /* ✅ Nếu chưa đăng nhập: chỉ hiển thị Đăng nhập */
          <button
            className={styles.loginButton}
            onClick={() => navigate("/")}
          >
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
