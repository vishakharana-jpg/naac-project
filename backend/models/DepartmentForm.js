const mongoose = require("mongoose");

const departmentFormSchema = new mongoose.Schema(
  {
    section: { type: String, required: true },
    heading: { type: String },
    description: { type: String },
    pdf: { type: String }, // file ka naam save hoga
  },
  { timestamps: true }
);

module.exports = mongoose.model("DepartmentForm", departmentFormSchema);