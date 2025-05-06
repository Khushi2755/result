const User = require("../models/User");
const Marks = require("../models/Marks");

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.feeDefaulter) {
      return res.status(403).json({ message: "Fee defaulter. Please clear your dues." });
    }
    const marks = await Marks.find({ student: req.user.id }).populate("subject");
    res.json({ user, marks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New endpoint to get all marks for the logged-in student
exports.getMarks = async (req, res) => {
  try {
    const marks = await Marks.find({ student: req.user.id }).populate("subject", "name branch year");
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
