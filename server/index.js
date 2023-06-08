import http from 'http';
import { env } from 'node:process';
import express from 'express';
import addWebpackMiddleware from './utils/addWebpackMiddleware.js';
import routes from './routes/routes.js';

const app = express();
const httpServer = http.createServer(app);

addWebpackMiddleware(app);

// 					page principal
app.use(express.json());

app.get('/', app.use(express.static('client/public')));

app.use('/api/oliveTrees', routes);

if (env.PORT === undefined) {
	env.PORT = 8000;
}
httpServer.listen(env.PORT, () => {
	console.log(`Server running at http://localhost:${env.PORT}/`);
});
