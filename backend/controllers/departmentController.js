const DepartmentForm = require("../models/DepartmentForm");

const submitDepartmentForm = async (req, res) => {
  try {
    const { section, heading, description } = req.body;
    const pdf = req.file ? req.file.filename : null;

    // Pehle check karo same section ka data hai ya nahi
    const existing = await DepartmentForm.findOne({ section });

    if (existing) {
      // Already hai toh update karo
      existing.heading = heading;
      existing.description = description;
      if (pdf) existing.pdf = pdf;
      await existing.save();
      return res.status(200).json({ message: "Updated", data: existing });
    }

    // Naya save karo
    const entry = new DepartmentForm({ section, heading, description, pdf });
    await entry.save();

    res.status(201).json({ message: "Saved", data: entry });
  } catch (err) {
    console.error("Department submit error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getDepartmentForm = async (req, res) => {
  try {
    const data = await DepartmentForm.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { submitDepartmentForm, getDepartmentForm };