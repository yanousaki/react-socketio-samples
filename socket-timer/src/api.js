import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToTimer(interval, callback) {
    socket.on(
        'timer',
        timestamp => callback(timestamp)
    );
    socket.emit('subscribeToTimer', interval);
}

export { subscribeToTimer };
