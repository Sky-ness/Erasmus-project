import getConnect from '../connect/connect.js';
import Ranking from '../model/Ranking.js';

const client = getConnect();

export class TreeDAO {
	// This function accesses to the database and calculate a score with the Topsis algorithm and send them on a correct order (ASC or DESC) to the website
	async getTreeRanked(params) {
		try {
			const query = `SELECT * FROM olivetrees WHERE id LIKE '%${params.search.toUpperCase()}%' ORDER BY CAST(regexp_replace(id, '[^0-9]', '', 'g') AS INTEGER), id`;

			const result = await client.query(query);
			const ranking = new Ranking(result.rows);

			if (params.ordering === 'DESC') {
				return ranking.ordering('DESC');
			} else if (params.ordering === 'ASC') {
				return ranking.ordering('ASC');
			}
			return result.rows;
		} catch (error) {
			//Manage other error
			throw new Error('Internal server error');
		}
	}
	// this function accesses to the database and get all the trees
	async getAllTrees() {
		try {
			const query = `SELECT * FROM olivetrees ORDER BY CAST(regexp_replace(id, '[^0-9]', '', 'g') AS INTEGER), id`;
			const result = await client.query(query);
			return result.rows;
		} catch (error) {
			// Manage other error
			throw new Error('Intenal server error');
		}
	}
	// this function accesses to the database and get a tree with an id precise in parameters
	async getTreeById(id) {
		try {
			const query = 'SELECT * FROM olivetrees where id= $1';
			const values = [id];

			const result = await client.query(query, values);
			return result.rows[0];
		} catch (error) {
			// Manage other error
			throw new Error(`Internal server error`);
		}
	}
	// this function accesses to the database and update data of one tree with an id and the modify data precise in parameters
	async updateTree(id, tree) {
		try {
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
				tree.treecode,
				tree.longitude,
				tree.latitude,
				tree.nisi,
				tree.perim_at_1m30,
				tree.base_perimeter,
				tree.height,
				tree.branch,
				tree.number_of_branches,
				tree.cavitation,
				tree.trunk_shapes,
				tree.trunk_torsion,
				tree.land_use,
				tree.paratiriseis,
				id,
			];

			const result = await client.query(query, values);
			return result.rowCount == 1;
		} catch (error) {
			if (error.code === '23514') {
				// Manage incorrect data format
				throw new Error('Data format error');
			} else {
				// Manage other error
				throw new Error(`Internal server error`);
			}
		}
	}
	// this function accesses to the database and create a tree with data precise in parameter.
	async createTree(tree) {
		try {
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
            paratiriseis ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;

			const values = [
				tree.id,
				tree.treecode,
				tree.longitude,
				tree.latitude,
				tree.nisi,
				tree.perim_at_1m30,
				tree.base_perimeter,
				tree.height,
				tree.branch,
				tree.number_of_branches,
				tree.cavitation,
				tree.trunk_shapes,
				tree.trunk_torsion,
				tree.land_use,
				tree.paratiriseis,
			];

			const result = await client.query(query, values);
			return result.rows[0];
		} catch (error) {
			if (error.code === '23505') {
				// Manage data duplicate error
				throw new Error('Duplicate data error');
			} else if (error.code === '23514') {
				// Manage incorrect data format
				throw new Error('Data format error');
			} else {
				// Manage other error
				throw new Error('Internal server error');
			}
		}
	}
	// this function accesses to the database and remove a tree thanks to an id precise on parameters
	async removeTree(id) {
		try {
			const query = 'DELETE FROM olivetrees WHERE id= $1';
			const values = [id];
			await client.query(query, values);
			return true;
		} catch (err) {
			// Manage other error
			throw new Error('Internal server error');
		}
	}
}
