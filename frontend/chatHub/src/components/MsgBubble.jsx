import React from 'react';
import './MsgBubble.css';

const MsgBubble = ({ content, isSent }) => {
  return (
    <div className={`message-bubble ${isSent ? 'sent' : 'received'}`}>
      {content}
    </div>
  );
};

export default MsgBubble;
