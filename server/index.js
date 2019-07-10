const server = require('net').createServer();
let counter = 0;
const sockets = {};

function timestamp() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
}

server.on('connection', socket => {
    console.log('Client connected');
    socket.write('What\'s your name?\n');
    socket.id = counter++;

    socket.on('data', data => {
        if (!sockets[socket.id]) {
            socket.name = data.toString().trim();

            sockets[socket.id] = socket;

            socket.write(`Welcome, ${socket.name}!\n`);
            return;
        }

        Object.entries(sockets).forEach(([id, client]) => {
            if (socket.id == id) return;
            client.write(`${socket.name} ${timestamp()}: `);
            client.write(data);
        });
    });

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log('Client disconnected');
    })
});

server.listen(8000, () => console.log('Server is up!'));