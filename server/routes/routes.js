import express from 'express';
import { readFileSync } from 'node:fs';
import getConnect from '../utils/connect.js';
import bodyParser from 'body-parser';

const router = express.Router();
const client = getConnect();

router.get('/', async (req, res) => {
	// const text = await client.query('SELECT * FROM commandes');
	// console.log(text.rows);
	// await client.end();

	// const json = JSON.parse(readFileSync('database/oliveTrees.json', 'utf8'));
	// // res.json(json);
	// res.statusCode = 200;

	client.query('SELECT * FROM commandes', (error, results) => {
		if (error) {
			throw error;
		}
		res.status(200).json(results.rows);
	});
});

router.post('/', (req, res) => {
	console.log(req.body);
	const { treeCode } = req.body;
	const query = 'INSERT INTO commandes (id) VALUES ($1)';
	const values = [treeCode];

	client.query(query, values, (error, results) => {
		if (error) {
			throw error;
		}
		res.status(201).send(`User added: ${req.body.treeCode}`);
	});
});

// router.post('/', (req, res) => {
// 	const {
// 		id_olives_tree,
// 		treeCode,
// 		longitude,
// 		latitude,
// 		nisi,
// 		perim_at_1m30,
// 		base_perimeter,
// 		height,
// 		branch,
// 		number_of_branches,
// 		cavitation,
// 		trunk_shapes,
// 		trunk_torsion,
// 		land_use,
// 		paratiriseis,
// 	} = req.body;

// 	const query = `INSERT INTO olivetrees (
// 	  id_olives_tree,
// 	  treeCode,
// 	  longitude,
// 	  latitude,
// 	  nisi,
// 	  perim_at_1m30,
// 	  base_perimeter,
// 	  height,
// 	  branch,
// 	  number_of_branches,
// 	  cavitation,
// 	  trunk_shapes,
// 	  trunk_torsion,
// 	  land_use,
// 	  paratiriseis
// 	) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;

// 	const values = [
// 		id_olives_tree,
// 		treeCode,
// 		longitude,
// 		latitude,
// 		nisi,
// 		perim_at_1m30,
// 		base_perimeter,
// 		height,
// 		branch,
// 		number_of_branches,
// 		cavitation,
// 		trunk_shapes,
// 		trunk_torsion,
// 		land_use,
// 		paratiriseis,
// 	];

// 	client.query(query, values, (error, results) => {
// 		if (error) {
// 			console.error(error);
// 			throw error;
// 		} else {
// 			res.status(201).send(`Olive tree added with ID: ${id_olives_tree}`);
// 		}
// 	});
// });

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	const query = 'DELETE FROM commandes WHERE id = $1';
	const values = [id];

	client.query(query, values, (error, results) => {
		if (error) {
			console.error(error);
			throw error;
		}
		res.status(200).send(`Olive tree deleted with ID: ${id}`);
	});
});

router.patch('/:id', (req, res) => {
	const { id } = req.params;
	const {
		id_olives_tree,
		treeCode,
		longitude,
		latitude,
		nisi,
		perim_at_1m30,
		base_perimeter,
		height,
		branch,
		number_of_branches,
		cavitation,
		trunk_shapes,
		trunk_torsion,
		land_use,
		paratiriseis,
	} = req.body;

	const query = `
	  UPDATE olivetrees 
	  SET 
		id_olives_tree = $1,
		treeCode = $2,
		longitude = $3,
		latitude = $4,
		nisi = $5,
		perim_at_1m30 = $6,
		base_perimeter = $7,
		height = $8,
		branch = $9,
		number_of_branches = $10,
		cavitation = $11,
		trunk_shapes = $12,
		trunk_torsion = $13,
		land_use = $14,
		paratiriseis = $15
	  WHERE id = $16
	`;

	const values = [
		id_olives_tree,
		treeCode,
		longitude,
		latitude,
		nisi,
		perim_at_1m30,
		base_perimeter,
		height,
		branch,
		number_of_branches,
		cavitation,
		trunk_shapes,
		trunk_torsion,
		land_use,
		paratiriseis,
		id,
	];

	client.query(query, values, (error, results) => {
		if (error) {
			console.error(error);
			throw error;
		} else {
			res.status(200).send(`Olive tree updated with ID: ${id}`);
		}
	});
});

export default router;
