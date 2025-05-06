// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getDashboard, getMarks } = require("../controllers/studentController");

router.get("/dashboard", auth, getDashboard);
router.get("/marks", auth, getMarks);

module.exports = router;
