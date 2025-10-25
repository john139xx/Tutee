import React from "react";
import styles from "./ClassSettingsPage.module.css";

const ClassSettingsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>✏️ Tùy chỉnh lớp học</h2>
      <p>Mentor có thể tạo lớp học mới, thêm học viên hoặc chỉnh sửa nội dung tại đây.</p>

      <form className={styles.form}>
        <input type="text" placeholder="Tên lớp học mới" />
        <input type="text" placeholder="Môn học" />
        <button>Tạo lớp học</button>
      </form>
    </div>
  );
};

export default ClassSettingsPage;
