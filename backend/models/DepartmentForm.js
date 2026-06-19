const mongoose = require("mongoose");

const departmentFormSchema = new mongoose.Schema(
  {
    section: { type: String, required: true }, // "faculty", "sports", "library"
    department: { type: String },              // "CS", "Arts" etc (baad mein kaam aayega)
    formData: { type: Object },                // poora form ka data ek object mein
    files: [{ metricId: Number, filename: String }], // har metric ki file
  },
  { timestamps: true }
);

module.exports = mongoose.model("DepartmentForm", departmentFormSchema);