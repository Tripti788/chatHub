import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import MsgBubble from '../components/MsgBubble';
import MsgInput from '../components/MsgInput';

const ChatWindow = ({ selectedUser, messages, onSendMessage, loggedInUser }) => {
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
            isSent={msg.sender === loggedInUser._id}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <MsgInput
        onSend={onSendMessage}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatWindow;
