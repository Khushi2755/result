const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getStudents, markDefaulter, unmarkDefaulter,
  addSubject, deleteSubject, addOrUpdateMarks
} = require("../controllers/teacherController");

router.get("/students", auth, getStudents);
router.post("/mark-defaulter", auth, markDefaulter);
router.post("/unmark-defaulter", auth, unmarkDefaulter);
router.post("/subject", auth, addSubject);
router.delete("/subject/:id", auth, deleteSubject);
router.post("/marks", auth, addOrUpdateMarks);

module.exports = router;
