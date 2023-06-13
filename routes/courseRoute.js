const express = require('express')
const courseController = require('../controllers/courseController')
const router = express.Router()

router.post('/addCourse',courseController.addCourse)
router.delete('/deleteCourse/:id',courseController.deleteCourse)
router.get('/getAllCourse',courseController.getAllCourse)


module.exports = router