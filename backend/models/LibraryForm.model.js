const mongoose = require("mongoose");

const MetricSchema = new mongoose.Schema({
  metricId: Number,
  heading: String,
  type: String,
  values: { type: Map, of: String },
  selectedOptions: [String],
  description: String,
  pdfFile: String,
});

const LibraryFormSchema = new mongoose.Schema(
  { metrics: [MetricSchema] },
  { timestamps: true }
);

module.exports = mongoose.model("LibraryForm", LibraryFormSchema);