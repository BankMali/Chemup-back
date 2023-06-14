const express = require("express");
const courseController = require("../controllers/courseController");
const router = express.Router();

router.post("/addCourse", courseController.addCourse);
router.delete("/:id", courseController.deleteCourse);
router.get("/", courseController.getAllCourse);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourse);
module.exports = router;
