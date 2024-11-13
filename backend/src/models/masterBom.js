// src/models/masterBom.js
const mongoose = require('mongoose');

const masterBomSchema = new mongoose.Schema({
  masterID: { type: String, required: true, unique: true },
  projectName: { type: String, required: true },
  projectNumber: { type: String, required: true },
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }]
});

const MasterBom = mongoose.model('MasterBom', masterBomSchema);

module.exports = MasterBom;
