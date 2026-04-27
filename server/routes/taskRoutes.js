const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); // Required for marks
const taskController = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

// POST /api/tasks
// FR-03: Create Task with validation
router.post('/', 
    [
        auth, 
        [
            check('title', 'Title is required (3-100 characters)').isLength({ min: 3, max: 100 }),
            check('description', 'Description must be at least 10 characters').isLength({ min: 10 }),
            check('priority', 'Priority must be Low, Medium, or High').isIn(['Low', 'Medium', 'High']),
            check('dueDate', 'A valid due date is required').isISO8601(),
            check('assignedTo', 'Assigned To is required (min 2 characters)').isLength({ min: 2 })
        ]
    ], 
    taskController.createTask
);

// GET /api/tasks
// FR-04: Fetch all tasks
router.get('/', auth, taskController.getTasks);

// PATCH /api/tasks/:id/status
// FR-05: Update status
router.patch('/:id/status', 
    [
        auth,
        [
            check('status', 'Status must be Pending, In Progress, or Completed').isIn(['Pending', 'In Progress', 'Completed'])
        ]
    ], 
    taskController.updateTaskStatus
);

// DELETE /api/tasks/:id
// FR-06: Delete task
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;