// src/models/submittal.js
const mongoose = require('mongoose');

const submittalSchema = new mongoose.Schema({
  submittalID: { type: String, required: true, unique: true },
  submittalNumber: { type: String, required: true },
  submittalName: { type: String, required: true },
  submittalDate: { type: Date, required: true },
  dateSubmitted: { type: Date, required: true },
  dateClosed: { type: Date, required: true },
  panelID: { type: mongoose.Schema.Types.ObjectId, ref: 'Panel' },
  projectNumber: { type: String, required: true }
});

const Submittal = mongoose.model('Submittal', submittalSchema);

module.exports = Submittal;
