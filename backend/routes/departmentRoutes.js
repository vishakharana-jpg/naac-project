const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// PDF save kahan hogi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST /api/department/submit
router.post('/submit', upload.single('pdf'), (req, res) => {
  const { section, heading, description } = req.body;
  const pdfFile = req.file ? req.file.filename : '';

  // Excel mein save
  const filePath = path.join(__dirname, '../data/submissions.xlsx');
  if (!fs.existsSync(path.join(__dirname, '../data'))) {
    fs.mkdirSync(path.join(__dirname, '../data'));
  }

  let workbook;
  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
  } else {
    workbook = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([['Date','Section','Heading','Description','PDF File']]);
    xlsx.utils.book_append_sheet(workbook, ws, 'Submissions');
  }

  const ws = workbook.Sheets['Submissions'];
  xlsx.utils.sheet_add_aoa(ws, [[
    new Date().toLocaleDateString('en-IN'),
    section, heading, description, pdfFile
  ]], { origin: -1 });

  xlsx.writeFile(workbook, filePath);
  res.json({ success: true, message: 'Data save ho gaya!' });
});

// GET /api/department/all — saara data laane ke liye
router.get('/all', (req, res) => {
  const filePath = path.join(__dirname, '../data/submissions.xlsx');
  if (!fs.existsSync(filePath)) return res.json([]);
  const wb = xlsx.readFile(filePath);
  const data = xlsx.utils.sheet_to_json(wb.Sheets['Submissions']);
  res.json(data);
});

module.exports = router;