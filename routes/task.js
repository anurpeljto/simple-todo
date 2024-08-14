const express = require('express');
const router = express.Router();
const TaskControllerClass = require('../controllers/task');

const TaskController = new TaskControllerClass();

router.route('/').get(TaskController.getTasks).post(TaskController.createTask);
router.route('/:id').get(TaskController.getTask).patch(TaskController.patchTask).delete(TaskController.deleteTask)

module.exports = router;