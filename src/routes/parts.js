const express = require('express');
const Part = require('../models/part');
const router = express.Router();

// Get all parts
router.get('/', async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new part
router.post('/', async (req, res) => {
  const { modelNumber, manufacturer, description } = req.body;

  const part = new Part({
    modelNumber,
    manufacturer,
    description,
  });

  try {
    const newPart = await part.save();
    res.status(201).json(newPart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single part by ID
router.get('/:id', async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }
    res.json(part);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a part by ID
router.put('/:id', async (req, res) => {
  try {
    const { modelNumber, manufacturer, description } = req.body;

    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    part.modelNumber = modelNumber || part.modelNumber;
    part.manufacturer = manufacturer || part.manufacturer;
    part.description = description || part.description;

    const updatedPart = await part.save();
    res.json(updatedPart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a part by ID
router.delete('/:id', async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    await part.deleteOne();
    res.json({ message: 'Part deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
