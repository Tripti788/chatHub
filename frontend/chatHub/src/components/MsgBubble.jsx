import React from 'react';
import './MsgBubble.css'; // Optional, for styling

const MsgBubble = ({ content, isSent }) => {
  return (
    <div className={`msg-bubble ${isSent ? 'sent' : 'received'}`}>
      {content}
    </div>
  );
};

export default MsgBubble;
