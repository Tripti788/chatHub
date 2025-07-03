const dotenv = require('dotenv');        // ✅ Load environment variables
dotenv.config();  
const express = require('express')
const http =require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/db')
const app = express()
const port = 3000
const cors = require('cors');

connectDB();
const server = http.createServer(app);
const io = socketIO(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"]
  }
});
app.use(cors());
app.use(express.json());

app.use('/api/messages', require('./routes/messageRoutes'));


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

io.on('connection',(socket) => {
  console.log("new client connected: ",socket.id);

  socket.on('SendMessage',(message) => {
    io.emit('recieveMessage',message);
  });

  socket.on('disconnect', () => {
    console.log("client disconnected", socket.id);
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
