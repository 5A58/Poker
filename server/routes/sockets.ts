import * as socketIO from 'socket.io';
import { Server as HttpServer } from 'http';
import TableManager from '../models/tableManager';

function initializeSockets(server: HttpServer, tableManager: TableManager) {
    const io: socketIO.Server = new socketIO.Server(server);
    io.serveClient(false);

    io.on('connection', socket => {
        console.log(socket.id + ' Connected');

        socket.send('Hello client from ' + socket.id);

        // handle the event sent with socket.send()
        socket.on('message', (data: any) => {
            console.log(data);
        });

        socket.on('disconnect', () => {
            console.log(socket.id + ' Disconnected');
        });
    });
}

export default initializeSockets;