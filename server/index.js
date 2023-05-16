import http from 'http';
import { env } from 'node:process';
import { readFileSync } from 'node:fs';
import express from 'express';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import getConnect from './utils/connect.js';
import routes from './routes/routes.js';

const client = getConnect();
const res = await client.query('SELECT * FROM commandes');
await client.end();
console.log(res.rows);

const app = express();
const httpServer = http.createServer(app);
addWebpackMiddleware(app);

// 					page principal
app.get('/', app.use(express.static('client/public')));

app.use('/api/oliveTrees', routes);

// app.get('/api/episodes/:id', (req, res) => {
// 	res.statusCode = 200;
// 	const { id } = req.params;
// 	const episodes = JSON.parse(readFileSync('database/oliveTrees.json', 'utf8'));
// 	const episode = episodes.find(ep => ep.id === parseInt(id));
// 	if (!episode) {
// 		res.sendStatus(404);
// 	} else {
// 		res.json(episode);
// 	}
// });

if (env.PORT == undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
