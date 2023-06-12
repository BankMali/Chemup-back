const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/', todoController.getAllTodos)
router.get('/user', todoController.getTodoByUser)
router.get('/summary', todoController.summaryTodo)
router.delete('/doubleDelete/:id1/:id2', todoController.doubleDelete2 )
router.get('/:id', todoController.getTodoById)
router.post('/', todoController.createTodo)
router.delete('/:id', todoController.deleteTodo)
router.put('/:id', todoController.updateTodo)

module.exports = router