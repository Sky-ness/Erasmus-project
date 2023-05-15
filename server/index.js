import http from 'http';
import { env } from 'node:process';
import express from 'express';
import { readFileSync } from 'node:fs';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import OliveTree from './model/OliveTree.js';
import pkg from 'pg';
const { Pool, Client } = pkg;
const credentials = {
	user: 'audrey',
	host: 'localhost',
	database: 'cours',
	password: 'postgres',
	port: 5432,
};

// Connect with a connection pool.

async function poolDemo() {
	const pool = new Pool(credentials);
	const now = await pool.query('SELECT NOW()');
	await pool.end();

	return now;
}

// Connect with a client.

async function clientDemo() {
	const client = new Client(credentials);
	await client.connect();
	const now = await client.query('SELECT NOW()');
	await client.end();

	return now;
}

// Use a self-calling function so we can use async / await.

(async () => {
	const poolResult = await poolDemo();
	console.log('Time with pool: ' + poolResult.rows[0]['now']);

	const clientResult = await clientDemo();
	console.log('Time with client: ' + clientResult.rows[0]['now']);
})();

const pool = new Pool(credentials);
const res = await pool.query('SELECT * FROM commandes');
console.log(res.rows);

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
