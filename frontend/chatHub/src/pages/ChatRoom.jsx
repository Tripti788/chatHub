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
      setLoggedInUser(user);

      // ✅ Connect to socket server
      socketRef.current = io('http://localhost:3000');

      // ✅ Listen for incoming messages
      socketRef.current.on('receiveMessage', (message) => {
        if (
          message.receiver === user.id ||
          message.sender === user.id
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      // ✅ Fetch users
      fetch('http://localhost:3000/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data)) {
            console.error("Backend error:", data.message || data);
            return;
          }
          const otherUsers = data.filter((u) => u._id.toString() !== user.id.toString());
          setUsers(otherUsers);
        })
        .catch((err) => {
          console.error('Error fetching users:', err);
        });

      // ✅ Disconnect on unmount
      return () => {
        socketRef.current.disconnect();
      };
    }
  }, []);

  const handleSendMessage = (content) => {
    if (!selectedUser || !loggedInUser) return;

    const message = {
      sender: loggedInUser.id,
      receiver: selectedUser._id,
      content,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, message]);

    // ✅ Emit message to backend
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
      />
    </div>
  );
};

export default ChatRoom;
