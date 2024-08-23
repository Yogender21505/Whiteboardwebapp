const express = require('express');
const router = express.Router();
const Whiteboard = require('../models/Whiteboard'); // Adjust the path as necessary

// Save a new whiteboard
router.post('/whiteboard/save', async (req, res) => {
    try {
        const { name, data } = req.body;
        const newWhiteboard = new Whiteboard({ name, data });
        await newWhiteboard.save();
        res.status(201).json(newWhiteboard);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save whiteboard' });
    }
});

// Get all whiteboards
router.get('/whiteboard', async (req, res) => {
    try {
        const whiteboards = await Whiteboard.find();
        res.status(200).json(whiteboards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch whiteboards' });
    }
});

// Get a whiteboard by ID
router.get('/whiteboard/:id', async (req, res) => {
    try {
        const whiteboard = await Whiteboard.findById(req.params.id);
        if (!whiteboard) {
            return res.status(404).json({ message: 'Whiteboard not found' });
        }
        res.status(200).json(whiteboard);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
