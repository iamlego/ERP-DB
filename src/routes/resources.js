// src/routes/resources.js
const express = require('express');
const Resource = require('../models/resource');
const router = express.Router();

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().populate('projectList');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new resource
router.post('/', async (req, res) => {
  const { resourceID, name, position, hours, projectList } = req.body;

  const resource = new Resource({
    resourceID,
    name,
    position,
    hours,
    projectList,
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a single resource by ID
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('projectList');
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a resource by ID
router.put('/:id', async (req, res) => {
  try {
    const { resourceID, name, position, hours, projectList } = req.body;

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.resourceID = resourceID || resource.resourceID;
    resource.name = name || resource.name;
    resource.position = position || resource.position;
    resource.hours = hours || resource.hours;
    resource.projectList = projectList || resource.projectList;

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a resource by ID
router.delete('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.remove();
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
