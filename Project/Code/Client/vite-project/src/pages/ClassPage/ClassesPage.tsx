import React from "react";
import styles from "./ClassesPage.module.css";
import BackToHomeButton from "../../components/BackToHomeButton";
const ClassesPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>🎓 Lớp học của bạn</h2>
      <p>Danh sách các lớp mà bạn đã đăng ký hoặc đang tham gia:</p>
      <div className={styles.card}>
        <h4>Công nghệ phần mềm</h4>
        <p>Mentor: Nguyễn Văn A</p>
        <p>Thời gian: Thứ 3 & Thứ 5</p>
      </div>
      <div className={styles.card}>
        <h4>Mạng máy tính</h4>
        <p>Mentor: Trần Thị B</p>
        <p>Thời gian: Thứ 2 & Thứ 4</p>
      </div>
    </div>
  );
};

export default ClassesPage;
