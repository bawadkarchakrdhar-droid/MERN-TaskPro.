const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: String, required: true } // Monday, 20 Apr format
});

module.exports = mongoose.model('Task', taskSchema);