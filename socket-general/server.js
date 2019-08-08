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
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/messages', function (req, res) {
    let t = new Date();
    let t_str = t.toJSON();
    console.log(req.body);
    let to = req.body.to;
    let msg = req.body.msg;
    let message = {};
    message['sent_t'] = t_str;
    message['msg'] = msg;
    if (to === 'all') {
        io.sockets.emit('message', message);
    }
    else {
        io.to(to).emit('message', message);
    }
    console.log('to:' + to + ', message:' + JSON.stringify(message));
    res.send('to:' + to + ', message:' + JSON.stringify(message));
});

http.listen(port, () => {
    console.log('listening on *:' + port);
});
