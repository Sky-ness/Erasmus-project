import http from 'http';
import { env } from 'node:process';
import express from 'express';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import routes from './routes/routes.js';
import path from 'path';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const httpServer = http.createServer(app);

addWebpackMiddleware(app);

// 					page principal
app.use(express.json());

app.get('/', app.use(express.static('client/public')));

app.get('/edit', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'client', 'public', 'update.html'));
});

app.use('/api/oliveTrees', routes);

if (env.PORT === undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
