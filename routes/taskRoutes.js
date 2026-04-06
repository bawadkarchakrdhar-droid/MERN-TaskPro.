const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 1. Get all tasks
router.get('/all', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Add a task
router.post('/add', async (req, res) => {
    const newTask = new Task({ title: req.body.title });
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Delete a task (Fix: ID handling)
router.delete('/:id', async (req, res) => {
    try {
        const result = await Task.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Task nahi mila!" });
        }
        res.status(200).json({ message: "Task Delete ho gaya!" });
    } catch (err) {
        res.status(500).json({ message: "ID format galat hai ya server error" });
    }
});

module.exports = router;