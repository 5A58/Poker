import * as socketIO from 'socket.io';
import { Server as HttpServer } from 'http';
import TableManager from '../models/tableManager.js';

function initializeSockets(server: HttpServer, tableManager: TableManager) {
    const io: socketIO.Server = new socketIO.Server(server);
    io.serveClient(false);

    const parentNamespace: socketIO.Namespace = io.of(/^\/[a-zA-Z0-9-]*$/);
    parentNamespace.on('connection', socket => {
        let namespaceName: string = socket.nsp.name;
        console.log(`${socket.id} connected to namespace ${namespaceName}`);
        namespaceName = namespaceName[0] == '/' ? namespaceName.substr(1) : namespaceName;

        socket.on('join table', () => {
            console.log(`${socket.id} is joining table ${namespaceName}`);
            let player = tableManager.addPlayerToTable(socket.id, namespaceName);
            if (player !== undefined) {
                socket.broadcast.emit('add player', player);
                socket.emit('initialize table', tableManager.getTableInfo(namespaceName))
            }
            else {
                socket.emit('table full');
            }
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected from namespace ${namespaceName}`);
            if (tableManager.removePlayerFromTable(namespaceName, socket.id)) {
                socket.broadcast.emit('remove player', socket.id);
            }
        });
    });
}

export default initializeSockets;