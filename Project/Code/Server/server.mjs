// server.mjs
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000; // ⚙️ Frontend gọi 4000 thì giữ nguyên 4000

// --- Đường dẫn tuyệt đối tới file dữ liệu ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, "users.json");
const MENTORS_FILE = path.join(__dirname, "mentors.json");

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

// --- Helper: đảm bảo file tồn tại ---
function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
  try {
    JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  } catch {
    fs.writeFileSync(filePath, "[]");
  }
}

// --- Đọc / Ghi file JSON ---
function readFile(filePath) {
  ensureFile(filePath);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw || "[]");
}

function writeFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 🧩 Debug route để kiểm tra backend hoạt động
app.get("/", (_, res) => res.send("✅ Backend server is running OK!"));

// ===================================================================
// 🧱 API USERS
// ===================================================================

// Lấy danh sách user
app.get("/users", (_, res) => {
  try {
    const users = readFile(USERS_FILE);
    res.json(users);
  } catch (err) {
    console.error("READ /users error:", err);
    res.status(500).json({ message: "Lỗi đọc dữ liệu người dùng!" });
  }
});

// Đăng ký user mới
app.post("/register", (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Thiếu username hoặc password!" });

    const users = readFile(USERS_FILE);
    if (users.find((u) => u.username === username)) {
      return res.status(400).json({ message: "Username đã tồn tại!" });
    }

    users.push({ username, password });
    writeFile(USERS_FILE, users);
    res.json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("POST /register error:", err);
    res.status(500).json({ message: "Lỗi ghi dữ liệu người dùng!" });
  }
});

// Đăng nhập user
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const users = readFile(USERS_FILE);
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) return res.json({ message: "Đăng nhập thành công!" });
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
  } catch (err) {
    console.error("POST /login error:", err);
    res.status(500).json({ message: "Lỗi đọc dữ liệu người dùng!" });
  }
});

// ===================================================================
// 🧱 API MENTOR
// ===================================================================

// Đăng ký mentor mới
app.post("/register-mentor", (req, res) => {
  try {
    const mentor = req.body;
    if (!mentor.email || !mentor.fullName)
      return res
        .status(400)
        .json({ message: "Thiếu thông tin bắt buộc (email, fullName)!" });

    const mentors = readFile(MENTORS_FILE);

    // Kiểm tra trùng email
    if (mentors.find((m) => m.email === mentor.email)) {
      return res.status(400).json({ message: "Email này đã được đăng ký!" });
    }

    mentors.push(mentor);
    writeFile(MENTORS_FILE, mentors);

    console.log("✅ Mentor mới:", mentor);
    res.json({ message: "Đăng ký mentor thành công!" });
  } catch (err) {
    console.error("POST /register-mentor error:", err);
    res.status(500).json({ message: "Lỗi ghi dữ liệu mentor!" });
  }
});

// Lấy danh sách mentor
app.get("/mentors", (_, res) => {
  try {
    const mentors = readFile(MENTORS_FILE);
    res.json(mentors);
  } catch (err) {
    console.error("READ /mentors error:", err);
    res.status(500).json({ message: "Lỗi đọc dữ liệu mentor!" });
  }
});

// ===================================================================
// ⚙️ Khởi chạy server
// ===================================================================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Users file: ${USERS_FILE}`);
  console.log(`📁 Mentors file: ${MENTORS_FILE}`);
});
