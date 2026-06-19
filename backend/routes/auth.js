const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const users = [
  {
    id: 1,
    email: "test@gmail.com",
    password: "$2b$10$OA3JV/RtW9dFJmMhiWGAp.2.GgqM5B.hEEvTvNo.4ssmEKMf8j8Xe",
  },
];
const departments = [
  { id: "arts_economics", password: "economics123", faculty: "arts" },
  { id: "arts_english", password: "english123", faculty: "arts" },
  { id: "arts_hindi", password: "hindi123", faculty: "arts" },
  { id: "arts_history", password: "history123", faculty: "arts" },
  { id: "arts_homescience", password: "homescience123", faculty: "arts" },
  { id: "arts_music", password: "music123", faculty: "arts" },
  { id: "arts_physed", password: "physed123", faculty: "arts" },
  { id: "arts_polsci", password: "polsci123", faculty: "arts" },
  { id: "arts_sanskrit", password: "sanskrit123", faculty: "arts" },
  { id: "arts_sociology", password: "sociology123", faculty: "arts" },
  { id: "arts_journalism", password: "journalism123", faculty: "arts" },
  { id: "arts_yoga", password: "yoga123", faculty: "arts" },
  { id: "arts_library", password: "library123", faculty: "arts" },
  { id: "science_biotech", password: "biotech123", faculty: "science" },
  { id: "science_botany", password: "botany123", faculty: "science" },
  { id: "science_chemistry", password: "chemistry123", faculty: "science" },
  { id: "science_cs", password: "cs123", faculty: "science" },
  { id: "science_electronics", password: "electronics123", faculty: "science" },
  { id: "science_maths", password: "maths123", faculty: "science" },
  { id: "science_microbiology", password: "microbiology123", faculty: "science" },
  { id: "science_physics", password: "physics123", faculty: "science" },
  { id: "science_stats", password: "stats123", faculty: "science" },
  { id: "science_zoology", password: "zoology123", faculty: "science" },
  { id: "science_geology", password: "geology123", faculty: "science" },
  { id: "management_mba", password: "mba123", faculty: "management" },
  { id: "management_ipsdr", password: "ipsdr123", faculty: "management" },
  { id: "management_tourism", password: "tourism123", faculty: "management" },
  { id: "technology_pharma", password: "pharma123", faculty: "technology" },
  { id: "biomedical_msc", password: "msc123", faculty: "biomedical" },
  { id: "biomedical_forensic", password: "forensic123", faculty: "biomedical" },
  { id: "biomedical_lab", password: "lab123", faculty: "biomedical" },
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


// Department Login Route
router.post("/dept-login", (req, res) => {
  const { deptId, password } = req.body;
  
  const dept = departments.find(d => d.id === deptId);
  
  if (!dept) {
    return res.status(400).json({ message: "Department nahi mila!" });
  }
  
  if (dept.password !== password) {
    return res.status(400).json({ message: "Password galat hai!" });
  }

  const token = jwt.sign(
    { deptId: dept.id, faculty: dept.faculty },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, message: "Login successful!" });
});
module.exports = router;