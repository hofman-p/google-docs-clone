const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  socket.on('send-delta', delta => {
    socket.broadcast.emit('received-delta', delta);
  })
  console.log('Client connected');
});