import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import initializeSockets from './routes/sockets.js';

// Environment variables
dotenv.config();
const port = process.env.PORT;

// File system variables
const __dirname = dirname(fileURLToPath(import.meta.url));

// Express config
const app = express();
app.use(express.static(join(__dirname, 'client/build')));

// SocketIO config
const server = createServer(app);
initializeSockets(server);

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'client', 'build', 'index.html'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));