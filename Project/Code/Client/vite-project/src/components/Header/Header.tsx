import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FaBars } from 'react-icons/fa';
import logo from '../../assets/bk-logo.png';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <FaBars className={styles.menuIcon} onClick={onToggleSidebar} />
        <img src={logo} alt="BK Tutor Logo" className={styles.logo} />
        <span className={styles.logoText}>TUTOR</span>
      </div>
      <div className={styles.rightSection}>
        {/* Thay đổi thẻ button thành thẻ Link ở đây */}
        <Link to="/mentor" className={styles.mentorButton}>
          Đăng ký Mentor
        </Link>
        <Link to="/login" className={styles.loginButton}>
          Đăng nhập
        </Link>
      </div>
    </header>
  );
};

export default Header;