const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ⚠️ Abhi database nahi hai to fake data use kar rahe hain
// Baad mein yahan DB query aayegi
const users = [
  {
    id: 1,
    email: "test@gmail.com",
    password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
    // upar wala hash hai "password123" ka
  },
];

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. email se user dhundo
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "Email ya password galat hai" });
    }

    // 2. password match karo
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email ya password galat hai" });
    }

    // 3. token banao
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, message: "Login ho gaya!" });

  } catch (error) {
    res.status(500).json({ message: "Server mein kuch gadbad hai" });
  }
});

// LOGOUT (frontend localStorage delete karta hai, backend sirf confirm karta hai)
router.post("/logout", (req, res) => {
  res.json({ message: "Logout ho gaya!" });
});

module.exports = router;