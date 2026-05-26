const mongoose = require("mongoose");

const EnrollmentRowSchema = new mongoose.Schema({
  sno:         { type: Number },
  programme:   { type: String },
  appReceived: { type: Number, default: 0 },
  admittedLSC: { type: Number, default: 0 },
  sc:          { type: Number, default: 0 },
  st:          { type: Number, default: 0 },
  obc:         { type: Number, default: 0 },
  ews:         { type: Number, default: 0 },
  pwdMale:     { type: Number, default: 0 },
  pwdFemale:   { type: Number, default: 0 },
  pwdState:    { type: Number, default: 0 },
});

const MetricSchema = new mongoose.Schema({
  metricId:    { type: Number },
  heading:     { type: String },
  checked:     [String],
  description: { type: String, default: "" },
  fileName:    { type: String, default: "" },
});

const AssessmentSchema = new mongoose.Schema({
  submittedBy:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  enrollmentData: [EnrollmentRowSchema],
  metrics:        [MetricSchema],
  submittedAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assessment", AssessmentSchema);