import express from 'express';
import getConnect from '../connect/connect.js';
import OliveTree from '../model/OliveTree.js';
import Ranking from '../model/Ranking.js';

const router = express.Router();
const client = getConnect();

router.get('/', async (req, res) => {
	const { search, ordering } = req.query;

	let query = `SELECT * FROM olivetrees WHERE id LIKE '%${search.toUpperCase()}%'`;

	client.query(query, (error, results) => {
		if (error) {
			throw error;
		}
		let treeList = [];
		results.rows.forEach((row, index) => {
			treeList[index] = new OliveTree(
				row.id,
				row.treecode,
				row.longitude,
				row.latitude,
				row.nisi,
				row.perim_at_1m30,
				row.height,
				row.base_perimeter,
				row.branch,
				row.number_of_branches,
				row.cavitation,
				row.trunk_shapes,
				row.trunk_torsion,
				row.land_use,
				row.paratiriseis
			);
		});
		const ranking = new Ranking(treeList);

		if (ordering === 'DESC') {
			treeList.sort((a, b) => a.score - b.score);
			const jsonResults = JSON.parse(JSON.stringify(treeList));
			res.status(200).json(jsonResults);
		} else if (ordering === 'ASC') {
			treeList.sort((a, b) => b.score - a.score);
			const jsonResults = JSON.parse(JSON.stringify(treeList));
			res.status(200).json(jsonResults);
		} else {
			console.log(ranking.idealTree);
			console.log(ranking.worseTree);
			res.status(200).json(results.rows);
		}
	});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const query = 'SELECT * FROM olivetrees where id= $1';
	const values = [id];
	console.log('id ' + id);
	console.log('id ' + query);

	client.query(query, values, (error, results) => {
		if (error) {
			console.error(error);
			throw error;
		}
		res.status(200).json(results.rows);
	});
});

router.post('/', (req, res) => {
	res.setHeader('content-type', 'application/json');
	console.log(req.headers);
	console.log(req.body);
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

	console.log('id ' + id_olives_tree);

	const query = `INSERT INTO olivetrees (
	  id,
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
	  paratiriseis
	) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;

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
	];

	client.query(query, values, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: "Erreur lors de l'ajout de l'olivier" });
		} else {
			res.status(201).json({ message: 'Olivier ajouté avec succès' });
		}
	});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	const query = 'DELETE FROM olivetrees WHERE id= $1';
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
	res.setHeader('content-type', 'application/json');
	const { id } = req.params;
	console.log(id);
	const {
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
		treeCode = $1,
		longitude = $2,
		latitude = $3,
		nisi = $4,
		perim_at_1m30 = $5,
		base_perimeter = $6,
		height = $7,
		branch = $8,
		number_of_branches = $9,
		cavitation = $10,
		trunk_shapes = $11,
		trunk_torsion = $12,
		land_use = $13,
		paratiriseis = $14
	  WHERE id = $15
	`;

	const values = [
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
