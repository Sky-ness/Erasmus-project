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
			treeList = ranking.ordering('DESC');
			const jsonResults = JSON.parse(JSON.stringify(treeList));
			res.status(200).json(jsonResults);
		} else if (ordering === 'ASC') {
			treeList = ranking.ordering('ASC');
			const jsonResults = JSON.parse(JSON.stringify(treeList));
			res.status(200).json(jsonResults);
		} else {
			res.status(200).json(results.rows);
		}
	});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const query = 'SELECT * FROM olivetrees where id= $1';
	const values = [id];

	client.query(query, values, (error, results) => {
		if (error) {
			console.error(error);
			throw error;
		}
		res.status(200).json(results.rows);
	});
});

router.post('/', (req, res) => {
	const {
		id,
		treecode,
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
	  treecode,
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
		id,
		treecode,
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

	client.query(query, values, error => {
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

	client.query(query, values, error => {
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
		treecode,
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
		treecode = COALESCE($1, treecode),
		longitude = COALESCE($2, longitude),
		latitude = COALESCE($3, latitude),
		nisi = COALESCE($4, nisi),
		perim_at_1m30 = COALESCE($5, perim_at_1m30),
		base_perimeter = COALESCE($6, base_perimeter),
		height = COALESCE($7, height),
		branch = COALESCE($8, branch),
		number_of_branches = COALESCE($9, number_of_branches),
		cavitation = COALESCE($10, cavitation),
		trunk_shapes = COALESCE($11, trunk_shapes),
		trunk_torsion = COALESCE($12, trunk_torsion),
		land_use = COALESCE($13, land_use),
		paratiriseis = COALESCE($14, paratiriseis)
	  WHERE id = $15
	`;

	const values = [
		treecode,
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
			res.status(200).send(results.rows);
		}
	});
});

export default router;
