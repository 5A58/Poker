import * as socketIO from 'socket.io';
import { Server as HttpServer } from 'http';
import TableManager from '../models/tableManager.js';

function initializeSockets(server: HttpServer, tableManager: TableManager) {
    const io: socketIO.Server = new socketIO.Server(server);
    io.serveClient(false);

    io.on('connection', socket => {
        console.log(socket.id + ' Connected');

        socket.on('join table', (tableId: string) => {
            console.log(socket.id + ` is joining table ${tableId}`);
            socket.join(tableId);
            let player = tableManager.addPlayerToTable(socket.id, tableId);
            if (player !== undefined) {
                socket.to(tableId).emit('add player', player);
                socket.emit('initialize table', tableManager.getTableInfo(tableId))
            }
            // Handle failure
        });

        socket.on('disconnect', () => {
            console.log(socket.id + ' Disconnected');
            let tableId = tableManager.removePlayerFromTable(socket.id);
            if (tableId !== undefined) {
                socket.to(tableId).emit('remove player', socket.id);
            }
        });
    });
}

export default initializeSockets;