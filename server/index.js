import http from 'http';
import { env } from 'node:process';
import express from 'express';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';

import routes from './routes/routes.js';
import bodyParser from 'body-parser';

const app = express();
const httpServer = http.createServer(app);
const bodyparse = bodyParser;
addWebpackMiddleware(app);

// 					page principal
app.use(bodyparse.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', app.use(express.static('client/public')));

app.use('/api/oliveTrees', routes);

if (env.PORT === undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
