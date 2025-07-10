// ChatRoom.jsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import UserListSidebar from '../components/UserList';
import ChatWindow from '../components/ChatWindow';
import './ChatRoom.css';

const ChatRoom = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      user._id = user._id || user.id; // ✅ Ensure _id exists
      delete user.id;
      setLoggedInUser(user);

      // Connect socket
      socketRef.current = io('https://chathub-mfeq.onrender.com');

      // Listen to incoming messages
      socketRef.current.on('receiveMessage', (message) => {
        if (
          message.receiver === user._id ||
          message.sender === user._id
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      // Fetch users
      fetch('https://chathub-mfeq.onrender.com/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setUsers(data.filter(u => u._id !== user._id));
          } else {
            console.error("Invalid user response", data);
          }
        })
        .catch(err => console.error("❌ Error fetching users:", err));

      return () => socketRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!selectedUser || !loggedInUser || !token) return;

    fetch(`https://chathub-mfeq.onrender.com/api/messages/${selectedUser._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Invalid message response:", data);
        }
      })
      .catch(err => console.error("❌ Failed to fetch messages:", err));
  }, [selectedUser]);

  const handleSendMessage = (content) => {
    if (!selectedUser || !loggedInUser) return;

    const message = {
      sender: loggedInUser._id,
      receiver: selectedUser._id,
      content,
      timestamp: new Date().toISOString()
    };
    socketRef.current.emit('sendMessage', message);
  };

  return (
    <div className="chatroom-container">
      <UserListSidebar
        users={users}
        selectedUser={selectedUser}
        onUserSelect={setSelectedUser}
        loggedInUser={loggedInUser}
      /> 
      <ChatWindow
        selectedUser={selectedUser}
        messages={messages}
        onSendMessage={handleSendMessage}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};
export default ChatRoom;