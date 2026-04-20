const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: String, required: true }, // Ye zaroori hai
});

module.exports = mongoose.model('Task', taskSchema);