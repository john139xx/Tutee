// src/components/Sidebar/Sidebar.tsx

import React from 'react';
import styles from './Sidebar.module.css';
import { FaBook, FaGraduationCap, FaPen } from 'react-icons/fa';

interface SidebarProps {
  isExpanded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded }) => {
  return (
    <div className={`${styles.sidebar} ${isExpanded ? '' : styles.collapsed}`}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            <FaBook className={styles.navIcon} />
            {isExpanded && <span className={styles.navText}>Thư viện</span>}
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            <FaGraduationCap className={styles.navIcon} />
            {isExpanded && <span className={styles.navText}>Lớp học</span>}
          </a>
        </li>
<li className={styles.navItem}>
      <a href="#" className={styles.navLink}>
        <FaPen className={styles.navIcon} /> {/* Thành FaPen */}
        {isExpanded && <span className={styles.navText}>Tùy chỉnh lớp học</span>}
      </a>
    </li>
      </ul>
    </div>
  );
};

export default Sidebar;