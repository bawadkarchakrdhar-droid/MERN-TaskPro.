const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String, required: true }, // Monday, 20 Apr jaisa data save hoga
});

module.exports = mongoose.model('Task', TaskSchema);