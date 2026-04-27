const Task = require('../models/Task'); // Ensure the file name is Task.js
const { validationResult } = require('express-validator');

// FR-03: Create Task
exports.createTask = async (req, res, next) => {
    // 1. Check for express-validator errors (Prevents 400 error loop)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, priority, dueDate, assignedTo } = req.body;

        // Create new task instance
        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user.id // Taken from the decoded JWT in authMiddleware
        });

        // Save to MongoDB
        const savedTask = await newTask.save();
        
        // Return 201 Success
        res.status(201).json(savedTask);
    } catch (err) {
        // Pass error to errorMiddleware (Prevents 500 crash)
        next(err);
    }
};

// FR-04: View All Tasks (Sorted by Due Date Ascending)
exports.getTasks = async (req, res, next) => {
    try {
        // Find all tasks and sort by dueDate (1 = Ascending)
        const tasks = await Task.find().sort({ dueDate: 1 });
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

// FR-05: Update Task Status
exports.updateTaskStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        
        // Validate that status is provided
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true, runValidators: true } // Returns the updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
};

// FR-06: Delete Task
exports.deleteTask = async (req, res, next) => {
    try {
        const taskToDelete = await Task.findById(req.params.id);

        if (!taskToDelete) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        next(err);
    }
};