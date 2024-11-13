// src/routes/billOfMaterials.js
const express = require('express');
const BillOfMaterials = require('../models/billOfMaterials');
const router = express.Router();

// Get all bills of materials
router.get('/', async (req, res) => {
  try {
    const boms = await BillOfMaterials.find().populate('parts');
    res.json(boms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new bill of materials
router.post('/', async (req, res) => {
  const { bomID, panelName, projectNumber, parts } = req.body;

  const bom = new BillOfMaterials({
    bomID,
    panelName,
    projectNumber,
    parts,
  });

  try {
    const newBom = await bom.save();
    res.status(201).json(newBom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single bill of materials by ID
router.get('/:id', async (req, res) => {
  try {
    const bom = await BillOfMaterials.findById(req.params.id).populate('parts');
    if (!bom) {
      return res.status(404).json({ message: 'Bill of materials not found' });
    }
    res.json(bom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a bill of materials by ID
router.put('/:id', async (req, res) => {
  try {
    const { bomID, panelName, projectNumber, parts } = req.body;

    const bom = await BillOfMaterials.findById(req.params.id);
    if (!bom) {
      return res.status(404).json({ message: 'Bill of materials not found' });
    }

    bom.bomID = bomID || bom.bomID;
    bom.panelName = panelName || bom.panelName;
    bom.projectNumber = projectNumber || bom.projectNumber;
    bom.parts = parts || bom.parts;

    const updatedBom = await bom.save();
    res.json(updatedBom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a bill of materials by ID
router.delete('/:id', async (req, res) => {
  try {
    const bom = await BillOfMaterials.findById(req.params.id);
    if (!bom) {
      return res.status(404).json({ message: 'Bill of materials not found' });
    }

    await bom.remove();
    res.json({ message: 'Bill of materials deleted' });
  } catch (error) {
    res.status500().json({ message: error.message });
  }
});

module.exports = router;
