import express from 'express';
import getConnect from '../connect/connect.js';
import OliveTree from '../model/OliveTree.js';

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
		if (ordering === 'DESC') {
			treeList.sort((a, b) => a.score - b.score);
			const jsonResults = JSON.parse(JSON.stringify(treeList));
			res.status(200).json(jsonResults);
		} else if (ordering === 'ASC') {
			treeList.sort((a, b) => b.score - a.score);
			const jsonResults = JSON.parse(JSON.stringify(treeList));
			res.status(200).json(jsonResults);
		} else res.status(200).json(results.rows);
	});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const query = 'SELECT * FROM olivetrees where id= $1';
	const values = [id];

	client.query(query, values, (error, res) => {
		if (error) {
			console.error(error);
			throw error;
		}
		res.status(200).json(res.rows);
	});
});

router.post('/', (req, res) => {
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

	console.log(req.body);

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
			throw error;
		} else {
			res.status(201).send(`Olive tree added with ID: ${id_olives_tree}`);
		}
	});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;

	const query = 'DELETE FROM commandes WHERE id_olives_tree= $1';
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
