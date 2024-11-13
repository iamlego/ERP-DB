// src/models/panel.js
const mongoose = require('mongoose');

const panelSchema = new mongoose.Schema({
  panelID: { type: String, required: true, unique: true },
  projectNumber: { type: String, required: true },
  panelName: { type: String, required: true },
  bomID: { type: mongoose.Schema.Types.ObjectId, ref: 'BillOfMaterials' },
  submittalNumber: { type: String, required: true }
});

const Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;
