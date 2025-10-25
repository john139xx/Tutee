import React from "react";
import styles from "./LibraryPage.module.css";
import BackToHomeButton from "../../components/";

const LibraryPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>📘 Thư viện tài liệu</h2>
        <BackToHomeButton /> {/* ✅ Nút trở về */}
      </div>

      <p>Danh sách tài liệu học tập và flashcard của bạn sẽ hiển thị tại đây.</p>

      <ul className={styles.subjectList}>
        <li>Giải tích 1</li>
        <li>Cấu trúc dữ liệu và giải thuật</li>
        <li>Cơ sở dữ liệu</li>
      </ul>
    </div>
  );
};

export default LibraryPage;
