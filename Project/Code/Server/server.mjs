import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// --- SCHEMA VÀ MODEL ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// --- API ĐĂNG KÝ ---
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Thiếu email hoặc mật khẩu!" });

    // Kiểm tra trùng tài khoản
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Tài khoản đã tồn tại!" });

    // Tạo tài khoản mới
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(200).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ khi đăng ký!" });
  }
});

// --- API ĐĂNG NHẬP ---
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    if (!user)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });

    res.status(200).json({ message: "Đăng nhập thành công!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi máy chủ khi đăng nhập!" });
  }
});
//--API MENTOR REGISTRATION ---
// --- SCHEMA VÀ MODEL CHO MENTOR ---
const mentorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  major: { type: String, required: true },
  role: { type: String, required: true },
  gpa: { type: Number, required: true },
  studentYear: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Mentor = mongoose.model("Mentor", mentorSchema);

// --- API ĐĂNG KÝ MENTOR ---
app.post("/register-mentor", async (req, res) => {
  try {
    const { fullName, email, phone, major, role, gpa, studentYear } = req.body;

    // Kiểm tra thiếu dữ liệu
    if (!fullName || !email || !phone || !major || !role || !gpa || !studentYear) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    // Kiểm tra trùng email
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: "Email này đã được đăng ký làm mentor!" });
    }

    // Tạo mentor mới
    const newMentor = new Mentor({
      fullName,
      email,
      phone,
      major,
      role,
      gpa,
      studentYear,
    });

    await newMentor.save();
    res.status(200).json({ message: "🎉 Đăng ký mentor thành công!" });
  } catch (err) {
    console.error("❌ Lỗi khi đăng ký mentor:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi đăng ký mentor!" });
  }
});

// --- API KIỂM TRA SERVER ---
app.get("/", (_, res) => {
  res.send("✅ Server BK Mentor đang chạy!");
});

// --- KHỞI ĐỘNG ---
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);
});
