import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [registeredCourses, setRegisteredCourses] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"available" | "registered">("available");
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  // Kiểm tra đăng nhập
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/"); // Chưa đăng nhập thì về Login
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.username);
    }
  }, [navigate]);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Danh sách môn học
  const courses = [
    { id: 1, name: "Pháp luật đại cương", teacher: "TS. Nguyễn Văn A", schedule: "Thứ 2 & Thứ 4, 7:30 - 9:30", location: "Phòng B203, Cơ sở Lý Thường Kiệt" },
    { id: 2, name: "Giải tích 1", teacher: "ThS. Lê Thị B", schedule: "Thứ 3 & Thứ 6, 9:45 - 11:45", location: "Phòng A402, Cơ sở Dĩ An" },
    { id: 3, name: "Công nghệ phần mềm", teacher: "TS. Phạm Minh C", schedule: "Thứ 5, 13:30 - 16:30", location: "Phòng C102, Cơ sở Lý Thường Kiệt" },
    { id: 4, name: "Cấu trúc dữ liệu và giải thuật", teacher: "TS. Nguyễn Văn D", schedule: "Thứ 3, 13:00 - 15:00", location: "Phòng B201, Cơ sở Lý Thường Kiệt" },
    { id: 5, name: "Hệ điều hành", teacher: "ThS. Lâm Quốc E", schedule: "Thứ 5, 9:30 - 11:30", location: "Phòng C204, Cơ sở Dĩ An" },
  ];

  const toggleExpand = (id: number) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };

  const handleAddCourse = (id: number) => {
    if (!registeredCourses.includes(id)) {
      setRegisteredCourses([...registeredCourses, id]);
      alert("✅ Đăng ký môn học thành công!");
    } else {
      alert("⚠️ Bạn đã đăng ký môn này rồi!");
    }
  };

  const handleRemoveCourse = (id: number) => {
    setRegisteredCourses(registeredCourses.filter((courseId) => courseId !== id));
    alert("🗑️ Hủy đăng ký môn học thành công!");
  };

  const displayedCourses =
    activeTab === "available"
      ? courses.filter((c) => !registeredCourses.includes(c.id))
      : courses.filter((c) => registeredCourses.includes(c.id));

  return (
    <div className={styles.homeContainer}>
      <Header onToggleSidebar={toggleSidebar} />
      <main className={styles.mainContent}>
        <Sidebar isExpanded={isSidebarExpanded} />
        <div className={styles.contentArea}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Xin chào, {user || "Người dùng"} 👋</h2>
           
          </div>

          {/* Tabs */}
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tabButton} ${activeTab === "available" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("available")}
            >
              Đăng ký môn
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "registered" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("registered")}
            >
              Môn đã đăng ký
            </button>
          </div>

          {/* Danh sách môn */}
          <div className={styles.courseList}>
            {displayedCourses.length === 0 ? (
              <p className={styles.emptyMessage}>
                {activeTab === "available"
                  ? "🎉 Bạn đã đăng ký tất cả các môn học!"
                  : "📘 Bạn chưa đăng ký môn học nào."}
              </p>
            ) : (
              displayedCourses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <div
                    className={styles.courseHeader}
                    onClick={() => toggleExpand(course.id)}
                  >
                    <span className={styles.courseName}>{course.name}</span>
                  </div>

                  {expandedCourse === course.id && (
                    <div className={styles.courseDetails}>
                      <p><strong>Giảng viên:</strong> {course.teacher}</p>
                      <p><strong>Thời khóa biểu:</strong> {course.schedule}</p>
                      <p><strong>Địa điểm:</strong> {course.location}</p>
                      {activeTab === "available" ? (
                        <button className={styles.addButton} onClick={() => handleAddCourse(course.id)}>Đăng ký</button>
                      ) : (
                        <button className={styles.removeButton} onClick={() => handleRemoveCourse(course.id)}>Hủy đăng ký</button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
