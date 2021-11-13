const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: String
});

module.exports = mongoose.model('tasks', TaskSchema);
