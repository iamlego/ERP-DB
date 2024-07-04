// src/routes/customers.js
const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().populate('listOfProjects');
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new customer
router.post('/', async (req, res) => {
  const { customerID, customerName, customerInformation, listOfProjects } = req.body;

  const customer = new Customer({
    customerID,
    customerName,
    customerInformation,
    listOfProjects,
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('listOfProjects');
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a customer by ID
router.put('/:id', async (req, res) => {
  try {
    const { customerID, customerName, customerInformation, listOfProjects } = req.body;

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.customerID = customerID || customer.customerID;
    customer.customerName = customerName || customer.customerName;
    customer.customerInformation = customerInformation || customer.customerInformation;
    customer.listOfProjects = listOfProjects || customer.listOfProjects;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.remove();
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
