// src/models/project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  jobNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    type: String,
    required: true,
  },
  panels: {
    type: [String], // Assuming panels are identified by some unique identifier
    default: [],
  },
  instruments: {
    type: [String], // Assuming instruments are identified by some unique identifier
    default: [],
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
