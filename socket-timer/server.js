const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8000;
let connectCounter = 0;

// Connection
io.on('connection', (client) => {
    const sessionID = client.id;
    connectCounter++;

    client.join('room', function () {
        console.log(sessionID, 'in room.');
    });

    console.log(sessionID, 'joined. Connections:', connectCounter);

    client.on('disconnect', function () {
        connectCounter--;
        console.log(sessionID, 'left. Connections:', connectCounter);
    });

    client.on('subscribeToTimer', (interval) => {
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });
});

http.listen(port, () => {
    console.log('listening on *:' + port);
});