import React, { useState } from "react";
import styles from "./MentorRegistrationPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MentorRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    major: "",
    role: "",
    gpa: "",
    studentYear: "",
    experience: "",
    description: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);

    // ⚙️ Kiểm tra dữ liệu đầu vào
    const gpaValue = parseFloat(formData.gpa);
    const yearValue = parseInt(formData.studentYear);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.major || !formData.role) {
      setMessage("⚠️ Vui lòng điền đầy đủ thông tin bắt buộc!");
      setMessageType("error");
      return;
    }

    if (!formData.email.endsWith("@hcmut.edu.vn")) {
      setMessage("⚠️ Vui lòng sử dụng email HCMUT hợp lệ (đuôi @hcmut.edu.vn)!");
      setMessageType("error");
      return;
    }

    if (yearValue < 2) {
      setMessage("⚠️ Chỉ sinh viên năm 2 trở lên mới có thể đăng ký Mentor!");
      setMessageType("error");
      return;
    }

    if (gpaValue < 3.2 || gpaValue > 4.0) {
      setMessage("⚠️ GPA phải nằm trong khoảng 3.2 - 4.0!");
      setMessageType("error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/register-mentor", formData);

      if (res.status === 200) {
        setMessage("🎉 Đăng ký Mentor thành công! Cảm ơn bạn đã tham gia.");
        setMessageType("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          major: "",
          role: "",
          gpa: "",
          studentYear: "",
          experience: "",
          description: "",
        });
        setTimeout(() => navigate("/home"), 180);
      }
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setMessage(`❌ ${err.response.data.message}`);
      } else {
        setMessage("❌ Lỗi kết nối máy chủ!");
      }
      setMessageType("error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Đăng ký trở thành Mentor</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email HCMUT"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="major"
            placeholder="Ngành học"
            value={formData.major}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Vai trò (VD: Sinh viên)"
            value={formData.role}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="studentYear"
            placeholder="Năm học (VD: 2, 3, 4)"
            value={formData.studentYear}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="0.1"
            name="gpa"
            placeholder="GPA (3.2 - 4.0)"
            value={formData.gpa}
            onChange={handleChange}
            required
          />
          <textarea
            name="experience"
            placeholder="Kinh nghiệm giảng dạy hoặc học tập"
            value={formData.experience}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Giới thiệu bản thân (tùy chọn)"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit" className={styles.submitButton}>
            Gửi đăng ký
          </button>
        </form>

        {/* ✅ Thông báo hiển thị đẹp trên form */}
        {message && (
          <div
            className={`${styles.messageBox} ${
              messageType === "success" ? styles.success : styles.error
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorRegistrationPage;
