const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST: Add Task
router.post('/', async (req, res) => {
    try {
        const { text, date } = req.body;
        const newTask = new Task({ text, date });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Fetch all
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Remove Task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;