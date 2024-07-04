// src/models/customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerID: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerInformation: { type: String, required: true },
  listOfProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
