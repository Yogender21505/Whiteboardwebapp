require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const whiteboardRoutes = require('./routes/whiteboardRoutes'); // Import routes

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api', whiteboardRoutes); // Use routes

// Socket.IO connection
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });

    socket.on('clear', () => {
        io.emit('clear');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
