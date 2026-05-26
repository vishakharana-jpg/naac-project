const mongoose = require('mongoose')

const MetricSchema = new mongoose.Schema({
  metricId: Number,
  heading: String,
  type: String,
  values: { type: Map, of: String },
  selectedOptions: [String],
  description: String,
  pdfFile: String,
})

const GeneralFormSchema = new mongoose.Schema({
  metrics: [MetricSchema],
  submittedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('GeneralForm', GeneralFormSchema);