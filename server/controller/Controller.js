import { TreeDAO } from '../dao/TreeDao.js';

const treeDao = new TreeDAO();

export class Controller {
	static async getTreeRanked(req, res) {
		try {
			const trees = await treeDao.getTreeRanked(req.query);
			res.json(trees);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server' });
		}
	}

	static async createTree(req, res) {
		try {
			const tree = await treeDao.createTree(req.body);
			res.status(201).json(tree);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server' });
		}
	}

	static async getAllTrees(req, res) {
		try {
			const trees = await treeDao.getAllTrees();
			res.status(200).json(trees);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server' });
		}
	}

	static async getTreeById(req, res) {
		try {
			const tree = await treeDao.getTreeById(req.params.id);
			if (!tree) {
				return res.status(404).json({ message: `Tree doesn't find` });
			}
			res.json(tree);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server' });
		}
	}

	static async updateTree(req, res) {
		try {
			const tree = await treeDao.updateTree(req.params.id, req.body);
			if (!tree) {
				return res.status(404).json({ message: `Tree doesn't find` });
			}
			res.json(tree);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server' });
		}
	}

	static async deleteTree(req, res) {
		try {
			const result = await treeDao.removeTree(req.params.id);
			if (!result) {
				return res.status(404).json({ message: `Tree doesn't find` });
			}
			res.json({ message: 'Successful Tree deleted' });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server' });
		}
	}
}
