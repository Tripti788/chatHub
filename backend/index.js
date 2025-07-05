// backend/index.js

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", // frontend port
    methods: ["GET", "POST"]
  }
});

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// ✅ Socket logic moved here
const socketHandler = require('./socket');
socketHandler(io);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
