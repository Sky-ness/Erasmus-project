import http from 'http';
import { env } from 'node:process';
import express from 'express';
import { readFileSync } from 'node:fs';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import OliveTree from './model/OliveTree.js';

const app = express();
const httpServer = http.createServer(app);
addWebpackMiddleware(app);

// 					page principal
app.get('/', app.use(express.static('client/public')));

app.get('/api/oliveTrees', (req, res) => {
	res.statusCode = 200;
	const json = JSON.parse(readFileSync('database/oliveTrees.json', 'utf8'));
	res.json(json);
});

if (env.PORT == undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
