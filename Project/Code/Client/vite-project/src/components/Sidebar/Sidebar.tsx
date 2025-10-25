import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { BookOpen, GraduationCap, Pencil } from "lucide-react";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/library" className={styles.navLink}>
            <BookOpen className={styles.navIcon} />
            <span className={styles.navText}>Thư viện</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/classes" className={styles.navLink}>
            <GraduationCap className={styles.navIcon} />
            <span className={styles.navText}>Lớp học</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/class-settings" className={styles.navLink}>
            <Pencil className={styles.navIcon} />
            <span className={styles.navText}>Tùy chỉnh lớp học</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
