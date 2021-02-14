import * as socketIO from 'socket.io';

function initializeSockets(server) {
    const io = new socketIO.Server(server);
    io.serveClient = false;

    io.on('connection', socket => {
        console.log(socket.id + ' Connected');

        socket.send('Hello ' + socket.id);

        socket.emit('greetings', 'Hey!', {
            'ms': 'jane'
        }, Buffer.from([4, 3, 3, 1]));

        // handle the event sent with socket.send()
        socket.on('message', (data) => {
            console.log(data);
        });

        socket.on('salutations', (elem1, elem2, elem3) => {
            console.log(elem1, elem2, elem3);
        });

        socket.on('disconnect', () => {
            console.log(socket.id + ' Disconnected');
        });
    });
}

export default initializeSockets;