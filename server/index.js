import http from 'http';
import { env } from 'node:process';
import express from 'express';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import routes from './routes/routes.js';
import bodyParser from 'body-parser';

const app = express();
const httpServer = http.createServer(app);

addWebpackMiddleware(app);

// Parse JSON request body
app.use(bodyParser.json());

// Parse URL-encoded request body
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

app.get('/', express.static('client/public'));

app.use('/api/oliveTrees', routes);

if (env.PORT === undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
