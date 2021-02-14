import dotenv from 'dotenv';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import initializeSockets from './routes/sockets.js';
import TableManager from './models/tableManager.js';

// File system variables
const __dirname = dirname(fileURLToPath(import.meta.url));

// Environment variables
const result = dotenv.config({ path: join(__dirname, '.env') })
if (result.error) {
    throw result.error
}
const port = process.env.PORT;

// Express config
const app = express();
app.use(express.static(join(__dirname, '../client/build')));

// Game table manager
let tableManager = new TableManager();

// SocketIO config
const server = createServer(app);
initializeSockets(server, tableManager);

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/build/index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));