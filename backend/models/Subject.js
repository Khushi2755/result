const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  branch: { type: String, enum: ["CSE", "ECE"] },
  year: { type: Number, enum: [1, 2, 3, 4] },
});

module.exports = mongoose.model("Subject", subjectSchema);
