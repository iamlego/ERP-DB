// src/models/globalBom.js
const mongoose = require('mongoose');

const globalBomSchema = new mongoose.Schema({
  globalID: { type: String, required: true, unique: true },
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Part' }]
});

const GlobalBom = mongoose.model('GlobalBom', globalBomSchema);

module.exports = GlobalBom;
