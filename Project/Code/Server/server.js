import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 4000;
const USERS_FILE = "./users.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ------------------------------
// 📁 Hàm đọc và ghi file JSON
// ------------------------------
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]");
  }
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ------------------------------
// ✅ API: Lấy danh sách user (test)
// ------------------------------
app.get("/users", (req, res) => {
  const users = readUsers();
  res.json(users);
});

// ------------------------------
// ✅ API: Đăng ký (Register)
// ------------------------------
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu username hoặc password!" });
  }

  const users = readUsers();

  // Kiểm tra trùng username
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username đã tồn tại!" });
  }

  users.push({ username, password });
  writeUsers(users);

  res.json({ message: "Đăng ký thành công!" });
});

// ------------------------------
// ✅ API: Đăng nhập (Login)
// ------------------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu username hoặc password!" });
  }

  const users = readUsers();

  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (found) {
    res.json({ message: "Đăng nhập thành công!" });
  } else {
    res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
  }
});

// ------------------------------
// ✅ Khởi động server
// ------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
