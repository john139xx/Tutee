import React, { useState } from "react";
import styles from "./MentorRegistrationPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MentorRegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    major: "",
    role: "",
    gpa: "",
    studentYear: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/register-mentor", formData);
      alert("🎉 Đăng ký mentor thành công!");
      navigate("/");
    } catch (err) {
      alert("❌ Đăng ký thất bại! Vui lòng thử lại.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Đăng ký Mentor</h1>
        <form className={styles.formGrid} onSubmit={handleSubmit}>
          <div className={styles.formColumn}>
            <div className={styles.inputGroup}>
              <label>Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="VD: Nguyễn Văn A"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="VD: a@hcmut.edu.vn"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="VD: 0912345678"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Chuyên ngành</label>
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder="VD: Khoa học máy tính"
                required
              />
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.inputGroup}>
              <label>Vai trò</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn vai trò --</option>
                <option value="sinh_vien">Sinh viên</option>
                <option value="giang_vien">Giảng viên</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>GPA</label>
              <input
                type="number"
                step="0.01"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="VD: 3.5"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Năm học</label>
              <input
                type="number"
                name="studentYear"
                value={formData.studentYear}
                onChange={handleChange}
                placeholder="VD: 4"
                required
              />
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.registerButton}>
                Đăng ký
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => navigate("/")}
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorRegistrationPage;
