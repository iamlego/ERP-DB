// src/models/project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  jobNumber: {type: String, required: true, unique: true,},
  customer:  { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  panels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Panel' }]
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
