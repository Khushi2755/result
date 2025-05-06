const User = require("../models/User");
const Subject = require("../models/Subject");
const Marks = require("../models/Marks");

exports.getStudents = async (req, res) => {
  const { branch, year } = req.query;
  const filter = {};
  if (branch) filter.branch = branch;
  if (year) filter.year = year;

  const students = await User.find({ ...filter, role: "student" });
  res.json(students);
};

exports.markDefaulter = async (req, res) => {
  const { studentId } = req.body;
  await User.findByIdAndUpdate(studentId, { feeDefaulter: true });
  res.json({ message: "Marked as defaulter" });
};

exports.unmarkDefaulter = async (req, res) => {
  const { studentId } = req.body;
  await User.findByIdAndUpdate(studentId, { feeDefaulter: false });
  res.json({ message: "Unmarked defaulter" });
};

exports.addSubject = async (req, res) => {
  const { name, branch, year } = req.body;
  const subject = await Subject.create({ name, branch, year });
  res.status(201).json(subject);
};

exports.deleteSubject = async (req, res) => {
  const { id } = req.params;
  await Subject.findByIdAndDelete(id);
  res.json({ message: "Subject deleted" });
};

// New endpoint to add or update marks for a student in a subject
exports.addOrUpdateMarks = async (req, res) => {
  const { studentId, subjectId, ct1, ct2, endsem, assignment } = req.body;

  if (!studentId || !subjectId) {
    return res.status(400).json({ message: "studentId and subjectId are required" });
  }

  let marks = await Marks.findOne({ student: studentId, subject: subjectId });

  if (marks) {
    // Update existing marks
    marks.ct1 = ct1 !== undefined ? ct1 : marks.ct1;
    marks.ct2 = ct2 !== undefined ? ct2 : marks.ct2;
    marks.endsem = endsem !== undefined ? endsem : marks.endsem;
    marks.assignment = assignment !== undefined ? assignment : marks.assignment;
    await marks.save();
  } else {
    // Create new marks entry
    marks = new Marks({
      student: studentId,
      subject: subjectId,
      ct1: ct1 || 0,
      ct2: ct2 || 0,
      endsem: endsem || 0,
      assignment: assignment || 0,
    });
    await marks.save();
  }

  res.json({ message: "Marks added/updated successfully", marks });
};
