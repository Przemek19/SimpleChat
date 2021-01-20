const express = require('express');
const SocketIO = require('socket.io');

const app = express();
const server = require('http').createServer(app);
const io = SocketIO().listen(server);

app.use('/assets', express.static('assets'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', socket => {
  socket.on('sendMessage', data => {
    if (data.nickname.length > 0 && data.content.length > 0);
    io.emit('outputMessage', {nickname: data.nickname, content: data.content});
  });
})

server.listen(80);