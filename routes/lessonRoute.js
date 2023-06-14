const express = require("express");
const lessonController = require("../controllers/lessonController");
const router = express.Router();

router.post("/addLesson", lessonController.addLesson);
// router.delete("/deleteLesson/:id", lessonController.deleteLesson);
router.get("/", lessonController.getAllLesson);
router.get("/:id", lessonController.getLessonById);
router.put("/:id", lessonController.updateLesson);
module.exports = router;
