// src/models/billOfMaterials.js
const mongoose = require('mongoose');

const billOfMaterialsSchema = new mongoose.Schema({
  bomID: { type: String, required: true, unique: true },
  panelName: { type: String, required: true },
  projectNumber: { type: String, required: true },
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }]
});

const BillOfMaterials = mongoose.model('BillOfMaterials', billOfMaterialsSchema);

module.exports = BillOfMaterials;
