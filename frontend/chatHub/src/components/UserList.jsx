import React from 'react';
import './UserList.css';

const UserList = ({ users, onUserSelect, selectedUser, loggedInUser }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        Logged in as: <strong>{loggedInUser?.name || 'Guest'}</strong>
      </div>
      
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user._id}
            className={`user-item ${selectedUser?._id === user._id ? 'selected' : ''}`}
            onClick={() => onUserSelect(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
