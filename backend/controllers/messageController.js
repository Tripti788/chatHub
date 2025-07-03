const Message = require('../models/Message');

// Send a message
const sendMessage = async (req, res) => {
  const { receiver, content } = req.body;

  if (!receiver || !content) {
    return res.status(400).json({ message: 'Receiver and content are required' });
  }

  try {
    const message = await Message.create({
      sender: req.user._id,
      receiver,
      content
    });

    res.status(201).json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// Get all messages between current user and selected user
const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Failed to retrieve messages' });
  }
};

module.exports = {
  sendMessage,
  getMessages
};
