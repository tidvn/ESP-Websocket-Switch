import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4001;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.static('src/ui'));
let mac = "";
io.on('connection', socket => {
    console.log('New Connection');
    io.to(socket.id).emit('tidvn', mac);
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
    
    socket.on('tidvn', data => {
        mac = data;
        socket.broadcast.emit('tidvn', data);
    });
});

httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});
