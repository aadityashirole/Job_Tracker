const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  role_title: {
    type: String,
    required: true
  },
  job_description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "applied"
  },
  applied_date: {
    type: Date
  },
  notes: {
    type: String,
    default: ""
  }
}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema)