import express from 'express';
import { readFileSync } from 'node:fs';
const router = express.Router();

router.get('/', (req, res) => {
	res.statusCode = 200;
	const json = JSON.parse(readFileSync('database/oliveTrees.json', 'utf8'));
	res.json(json);
});

router.post('/', (req, res) => {
	res.json({ message: 'ceci est un post de ' + req.body });
});

router.delete('/:id', (req, res) => {
	res.json({ message: 'ceci est un delete de  ' + req.params.id });
});

router.patch('/modif/:id', (req, res) => {
	res.json({ message: 'ceci est un patch  ' + req.params.id });
});

export default router;
