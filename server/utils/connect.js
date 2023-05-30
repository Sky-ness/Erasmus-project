import pkg from 'pg';
const { Client } = pkg;

const credentials = {
	user: 'audrey',
	host: 'localhost',
	database: 'cours',
	password: 'postgres',
	port: 5432,
};

// Connect with a client.

async function clientDemo() {
	const client = new Client(credentials);
	await client.connect();
	const now = await client.query('SELECT NOW()');
	await client.end();

	return now;
}

// // Use a self-calling function so we can use async / await.

// (async () => {
// 	const clientResult = await clientDemo();
// 	console.log('Time with client: ' + clientResult.rows[0]['now']);
// })();

export default function getConnect() {
	const client = new Client(credentials);
	client.connect();
	return client;
}
