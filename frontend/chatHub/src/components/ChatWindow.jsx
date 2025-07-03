import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import MsgBubble from '../components/MsgBubble'; // Make sure MsgBubble.jsx exists and exports default
import MsgInput from '../components/MsgInput';   // Correct the path if needed

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedUser) {
    return <div className="chat-window empty">Select a user to start chatting</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        Chatting with <strong>{selectedUser.name}</strong>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <MsgBubble
            key={index}
            content={msg.content}
            isSent={msg.sender === 'me'}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <MsgInput onSend={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
