
// src/routes/panels.js
const express = require('express');
const Panel = require('../models/panel');
const router = express.Router();

// Get all panels
router.get('/', async (req, res) => {
  try {
    const panels = await Panel.find().populate({
      path: 'bomID',
      populate: {
        path: 'parts',
        model: 'Part'
      }
    });
    res.json(panels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new panel
router.post('/', async (req, res) => {
  const { panelID, projectNumber, panelName, bomID, submittalNumber } = req.body;

  const panel = new Panel({
    panelID,
    projectNumber,
    panelName,
    bomID,
    submittalNumber
  });

  try {
    const newPanel = await panel.save();
    const populatedPanel = await newPanel.populate({
      path: 'bomID',
      populate: {
        path: 'parts',
        model: 'Part'
      }
    });
    res.status(201).json(populatedPanel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single panel by ID
router.get('/:id', async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id).populate({
      path: 'bomID',
      populate: {
        path: 'parts',
        model: 'Part'
      }
    });
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
    const { panelID, projectNumber, panelName, bomID, submittalNumber } = req.body;

    const panel = await Panel.findById(req.params.id);
    if (!panel) {
      return res.status(404).json({ message: 'Panel not found' });
    }

    panel.panelID = panelID || panel.panelID;
    panel.projectNumber = projectNumber || panel.projectNumber;
    panel.panelName = panelName || panel.panelName;
    panel.bomID = bomID || panel.bomID;
    panel.submittalNumber = submittalNumber || panel.submittalNumber;

    const updatedPanel = await panel.save();
    const populatedPanel = await updatedPanel.populate({
      path: 'bomID',
      populate: {
        path: 'parts',
        model: 'Part'
      }
    });
    res.json(populatedPanel);
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
