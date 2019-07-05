const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8000;
let connectCounter = 0;

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
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/message', function (req, res) {
    let msg = req.body.msg;
    io.sockets.emit('alert', msg);
    console.log('alert message: ' + msg);
    res.send('alert message: ' + msg);
});

http.listen(port, () => {
    console.log('listening on *:' + port);
});
