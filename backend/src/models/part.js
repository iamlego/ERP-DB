const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    required: true,
    unique: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Part = mongoose.model('Part', partSchema);

console.log(Part);

module.exports = Part;
