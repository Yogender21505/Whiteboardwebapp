const Whiteboard = require('../models/Whiteboard');

exports.createWhiteboard = async (req, res) => {
    try {
        const whiteboard = new Whiteboard(req.body);
        await whiteboard.save();
        res.status(201).json(whiteboard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getWhiteboard = async (req, res) => {
    try {
        const whiteboard = await Whiteboard.findById(req.params.id);
        if (!whiteboard) {
            return res.status(404).json({ message: 'Whiteboard not found' });
        }
        res.json(whiteboard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateWhiteboard = async (req, res) => {
    try {
        const whiteboard = await Whiteboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(whiteboard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
