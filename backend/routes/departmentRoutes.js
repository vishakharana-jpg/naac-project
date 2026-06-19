const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const DepartmentForm = require('../models/DepartmentForm');

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST /api/department/submit — EK BAAR mein poora form save
router.post('/submit', upload.any(), async (req, res) => {
  try {
    const { section, department, formData } = req.body;

    // files ka array banao — metricId ke saath
    const files = req.files.map(f => ({
      metricId: Number(f.fieldname.replace('file_', '')),
      filename: f.filename
    }));

    // 1. MongoDB mein save
    const newEntry = new DepartmentForm({
      section,
      department,
      formData: JSON.parse(formData),
      files
    });
    await newEntry.save();

    // 2. Excel mein bhi save
    const excelPath = path.join(__dirname, '../data/submissions.xlsx');
    if (!fs.existsSync(path.join(__dirname, '../data'))) {
      fs.mkdirSync(path.join(__dirname, '../data'));
    }

    let workbook;
    if (fs.existsSync(excelPath)) {
      workbook = xlsx.readFile(excelPath);
    } else {
      workbook = xlsx.utils.book_new();
      const ws = xlsx.utils.aoa_to_sheet([
        ['Date', 'Section', 'Department', 'Form Data', 'Files']
      ]);
      xlsx.utils.book_append_sheet(workbook, ws, 'Submissions');
    }

    const ws = workbook.Sheets['Submissions'];
    xlsx.utils.sheet_add_aoa(ws, [[
      new Date().toLocaleDateString('en-IN'),
      section,
      department || '',
      JSON.stringify(JSON.parse(formData)),
      files.map(f => f.filename).join(', ')
    ]], { origin: -1 });

    xlsx.writeFile(workbook, excelPath);

    res.json({ success: true, message: 'Data save ho gaya!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/department/all — Admin ke liye MongoDB se data
router.get('/all', async (req, res) => {
  try {
    const { section } = req.query;
    const filter = section ? { section } : {};
    const data = await DepartmentForm.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/department/download-excel — Excel download
router.get('/download-excel', (req, res) => {
  const filePath = path.join(__dirname, '../data/submissions.xlsx');
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Abhi koi data nahi hai' });
  }
  res.download(filePath, 'NAAC_Submissions.xlsx');
});

//data  delete krne ke liy
router.delete('/delete/:id', async (req, res) => {
  try {
    await DepartmentForm.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Delete ho gaya!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;