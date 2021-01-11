import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Express from 'express';

// Environment variables
dotenv.config();
const port = process.env.PORT;

// File system variables
const __dirname = dirname(fileURLToPath(import.meta.url));

// Express config
const app = Express();

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file
app.get('*', (req, res) => {
    res.sendFile('/client/index.html', { root: __dirname });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
