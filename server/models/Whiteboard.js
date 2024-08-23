const mongoose = require('mongoose');

const WhiteboardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} }, // Changed to Mixed type for better flexibility
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Whiteboard', WhiteboardSchema);
