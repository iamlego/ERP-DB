// src/models/panel.js
const mongoose = require('mongoose');

const panelSchema = new mongoose.Schema({
  panelID: { type: String, required: true, unique: true },
  panelName: { type: String, required: true },
  panelLocation: { type: String, required: true },
  panelHours: { type: Number, required: true },
  productNumber: { type: String, required: true },
  bomID: { type: mongoose.Schema.Types.ObjectId, ref: 'BillOfMaterials' },
  submittalNumber: { type: String, required: true }
});

const Panel = mongoose.model('Panel', panelSchema);

module.exports = Panel;
