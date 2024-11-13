// src/models/resource.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  resourceID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  hours: { type: Number, required: true },
  projectList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
