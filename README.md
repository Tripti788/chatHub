# 💬 ChatHub

**ChatHub** is a real-time messaging web application built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Socket.IO** integration for seamless, private conversations between users.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 🧑‍🤝‍🧑 Real-time private messaging
- 📩 Message history stored in MongoDB
- 🟢 Active user selection and chat
- 🌐 Responsive design (mobile-friendly)
- ⚡ Socket.IO for real-time communication

---

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React.js | Node.js |
| React Router | Express |
| Socket.IO | MongoDB & Mongoose |
| Tailwind CSS / Custom CSS | JWT Authentication |

---

## 📸 Screenshots

Coming soon...

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Tripti788/chathub.git
cd chathub

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../backend
npm install

# Create .env file in backend
touch .env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
---


# Start Backend
cd backend
npm start

# Start Frontend
cd ../client
npm run dev



/client    → React frontend
/backend   → Express + MongoDB backend with Socket.IO
/models    → Mongoose schemas
/routes    → API endpoints
/socket    → Socket.IO server

