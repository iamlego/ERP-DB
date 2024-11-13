// src/routes/submittals.js
const express = require('express');
const Submittal = require('../models/submittal');
const router = express.Router();

// Get all submittals
router.get('/', async (req, res) => {
  try {
    const submittals = await Submittal.find().populate('panelID');
    res.json(submittals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new submittal
router.post('/', async (req, res) => {
  const { submittalID, submittalNumber, submittalName, submittalDate, dateSubmitted, dateClosed, panelID, projectNumber } = req.body;

  const submittal = new Submittal({
    submittalID,
    submittalNumber,
    submittalName,
    submittalDate,
    dateSubmitted,
    dateClosed,
    panelID,
    projectNumber,
  });

  try {
    const newSubmittal = await submittal.save();
    res.status(201).json(newSubmittal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single submittal by ID
router.get('/:id', async (req, res) => {
  try {
    const submittal = await Submittal.findById(req.params.id).populate('panelID');
    if (!submittal) {
      return res.status(404).json({ message: 'Submittal not found' });
    }
    res.json(submittal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a submittal by ID
router.put('/:id', async (req, res) => {
  try {
    const { submittalID, submittalNumber, submittalName, submittalDate, dateSubmitted, dateClosed, panelID, projectNumber } = req.body;

    const submittal = await Submittal.findById(req.params.id);
    if (!submittal) {
      return res.status(404).json({ message: 'Submittal not found' });
    }

    submittal.submittalID = submittalID || submittal.submittalID;
    submittal.submittalNumber = submittalNumber || submittal.submittalNumber;
    submittal.submittalName = submittalName || submittal.submittalName;
    submittal.submittalDate = submittalDate || submittal.submittalDate;
    submittal.dateSubmitted = dateSubmitted || submittal.dateSubmitted;
    submittal.dateClosed = dateClosed || submittal.dateClosed;
    submittal.panelID = panelID || submittal.panelID;
    submittal.projectNumber = projectNumber || submittal.projectNumber;

    const updatedSubmittal = await submittal.save();
    res.json(updatedSubmittal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a submittal by ID
router.delete('/:id', async (req, res) => {
  try {
    const submittal = await Submittal.findById(req.params.id);
    if (!submittal) {
      return res.status(404).json({ message: 'Submittal not found' });
    }

    await submittal.remove();
    res.json({ message: 'Submittal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
