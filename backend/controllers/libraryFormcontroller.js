const LibraryForm = require("../models/LibraryForm.model.js");

const submitLibraryForm = async (req, res) => {
  try {
    const metrics = JSON.parse(req.body.metrics);

    metrics.forEach((metric) => {
      if (req.files && req.files[String(metric.metricId)]) {
        metric.pdfFile = req.files[String(metric.metricId)][0].filename;
      }
    });

    const newForm = new LibraryForm({ metrics });
    await newForm.save();

    res.status(201).json({
      success: true,
      message: "Library form saved successfully!",
      data: newForm,
    });
  } catch (error) {
    console.error("Library form error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getLibraryForms = async (req, res) => {
  try {
    const forms = await LibraryForm.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { submitLibraryForm, getLibraryForms };