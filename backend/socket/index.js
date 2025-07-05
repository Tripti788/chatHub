// backend/socket/index.js
const Message = require('../models/Message');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on('sendMessage', async (message) => {
      console.log("📨 Message received:", JSON.stringify(message));

      if (!message.sender || !message.receiver || !message.content) {
        console.warn("⚠️ Missing fields:", message);
        return;
      }

      try {
        const newMsg = new Message({
          sender: message.sender,
          receiver: message.receiver,
          content: message.content
        });

        const saved = await newMsg.save();
        console.log("✅ Message saved:", saved);
        io.emit('receiveMessage', saved); // Broadcast to all clients
      } catch (err) {
        console.error("❌ Failed to save message:", err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
