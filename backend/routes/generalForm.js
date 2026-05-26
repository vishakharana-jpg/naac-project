const express = require('express')
const router = express.Router()
const multer = require('multer')
const GeneralForm = require('../models/GeneralForm')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
})
const upload = multer({ storage })

router.post('/', upload.any(), async (req, res) => {
  try {
    const metrics = JSON.parse(req.body.metrics)
    req.files.forEach((file) => {
      const idx = metrics.findIndex((m) => m.metricId === parseInt(file.fieldname))
      if (idx !== -1) metrics[idx].pdfFile = file.filename
    })
    const form = new GeneralForm({ metrics })
    await form.save()
    res.status(201).json({ message: 'Form saved!', data: form })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const forms = await GeneralForm.find().sort({ submittedAt: -1 })
    res.json(forms)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;