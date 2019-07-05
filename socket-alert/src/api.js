import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToAlert(callback) {
    socket.on(
        'alert',
        msg => callback(msg)
    );
}

export { subscribeToAlert };
