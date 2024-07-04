// src/routes/panels.js
const express = require('express');
const Panel = require('../models/panel');
const router = express.Router();

// Get all panels
router.get('/', async (req, res) => {
  try {
    const panels = await Panel.find().populate('bomID');
    res.json(panels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new panel
router.post('/', async (req, res) => {
  const { panelID, panelName, panelLocation, panelHours, productNumber, bomID, submittalNumber } = req.body;

  const panel = new Panel({
    panelID,
    panelName,
    panelLocation,
    panelHours,
    productNumber,
    bomID,
    submittalNumber,
  });

  try {
    const newPanel = await panel.save();
    res.status(201).json(newPanel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single panel by ID
router.get('/:id', async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id).populate('bomID');
    if (!panel) {
      return res.status(404).json({ message: 'Panel not found' });
    }
    res.json(panel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a panel by ID
router.put('/:id', async (req, res) => {
  try {
    const { panelID, panelName, panelLocation, panelHours, productNumber, bomID, submittalNumber } = req.body;

    const panel = await Panel.findById(req.params.id);
    if (!panel) {
      return res.status(404).json({ message: 'Panel not found' });
    }

    panel.panelID = panelID || panel.panelID;
    panel.panelName = panelName || panel.panelName;
    panel.panelLocation = panelLocation || panel.panelLocation;
    panel.panelHours = panelHours || panel.panelHours;
    panel.productNumber = productNumber || panel.productNumber;
    panel.bomID = bomID || panel.bomID;
    panel.submittalNumber = submittalNumber || panel.submittalNumber;

    const updatedPanel = await panel.save();
    res.json(updatedPanel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a panel by ID
router.delete('/:id', async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id);
    if (!panel) {
      return res.status(404).json({ message: 'Panel not found' });
    }

    await panel.remove();
    res.json({ message: 'Panel deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
