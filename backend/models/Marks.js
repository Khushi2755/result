const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  ct1: { type: Number, default: 0 },
  ct2: { type: Number, default: 0 },
  endsem: { type: Number, default: 0 },
  assignment: { type: Number, default: 0 },
});

module.exports = mongoose.model("Marks", marksSchema);
