// src/routes/masterBOM.js
const express = require('express');
const MasterBOM = require('../models/masterBom');
const router = express.Router();

// Get all master BOMs
router.get('/', async (req, res) => {
  try {
    const masterBOMs = await MasterBOM.find().populate('parts');
    res.json(masterBOMs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new master BOM
router.post('/', async (req, res) => {
  const { masterID, projectName, projectNumber, parts } = req.body;

  const masterBOM = new MasterBOM({
    masterID,
    projectName,
    projectNumber,
    parts,
  });

  try {
    const newMasterBOM = await masterBOM.save();
    res.status(201).json(newMasterBOM);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single master BOM by ID
router.get('/:id', async (req, res) => {
  try {
    const masterBOM = await MasterBOM.findById(req.params.id).populate('parts');
    if (!masterBOM) {
      return res.status(404).json({ message: 'Master BOM not found' });
    }
    res.json(masterBOM);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a master BOM by ID
router.put('/:id', async (req, res) => {
  try {
    const { masterID, projectName, projectNumber, parts } = req.body;

    const masterBOM = await MasterBOM.findById(req.params.id);
    if (!masterBOM) {
      return res.status(404).json({ message: 'Master BOM not found' });
    }

    masterBOM.masterID = masterID || masterBOM.masterID;
    masterBOM.projectName = projectName || masterBOM.projectName;
    masterBOM.projectNumber = projectNumber || masterBOM.projectNumber;
    masterBOM.parts = parts || masterBOM.parts;

    const updatedMasterBOM = await masterBOM.save();
    res.json(updatedMasterBOM);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a master BOM by ID
router.delete('/:id', async (req, res) => {
  try {
    const masterBOM = await MasterBOM.findById(req.params.id);
    if (!masterBOM) {
      return res.status(404).json({ message: 'Master BOM not found' });
    }

    await masterBOM.remove();
    res.json({ message: 'Master BOM deleted' });
  } catch (error) {
    res.status500().json({ message: error.message });
  }
});

module.exports = router;
