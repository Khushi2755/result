const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "teacher"], required: true },
  branch: { type: String, enum: ["CSE", "ECE"] },
  year: { type: Number, enum: [1, 2, 3, 4] },
  feeDefaulter: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
