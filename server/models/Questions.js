const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    role: { type: String, required: true, unique: true },
    technical: [{ question: String, tip: String }],
    behavioral: [{ question: String, tip: String }],
    hr: [{ question: String, tip: String }]
});

module.exports = mongoose.model("Question", questionSchema);