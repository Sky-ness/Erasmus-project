import { TreeDAO } from '../dao/TreeDao.js';

const treeDao = new TreeDAO();

export class Controller {
	// this static function uses the TreeDao and send to the website the error code corresponding
	static async getTreeRanked(req, res) {
		try {
			const trees = await treeDao.getTreeRanked(req.query);
			res.status(200).json(trees);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server during ranking tree' });
		}
	}
	// this static function uses the TreeDao and send to the website the error code corresponding (409 for a conflict error , 422 for a format error)
	static async createTree(req, res) {
		try {
			const tree = await treeDao.createTree(req.body);
			res.status(201).json(tree);
		} catch (err) {
			console.error(err);
			if (err.message === 'Duplicate data error') {
				res
					.status(409)
					.json({ message: 'Error duplicate tree during creation' });
			} else if (err.message === 'Data Format error') {
				res.status(422).json({ message: 'Data Format error' });
			} else {
				res.status(500).json({ message: 'Error server during creation' });
			}
		}
	}
	// this static function uses the TreeDao and send to the website the error code corresponding
	static async getAllTrees(req, res) {
		try {
			const trees = await treeDao.getAllTrees();
			res.status(200).json(trees);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server during get all tree' });
		}
	}
	// this static function uses the TreeDao and send to the website the error code corresponding (404 for a not found ressource)
	static async getTreeById(req, res) {
		try {
			const tree = await treeDao.getTreeById(req.params.id);
			if (!tree) {
				res.status(404).json({ message: 'Ressource not found' });
			}
			res.json(tree);
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server during get a tree' });
		}
	}

	// this static function uses the TreeDao and send to the website the error code corresponding (409 for a conflict error , 422 for a format error)
	static async updateTree(req, res) {
		try {
			const tree = await treeDao.updateTree(req.params.id, req.body);
			if (!tree) {
				return res.status(404).json({ message: '404 Ressource not found' });
			}
			res.json(tree);
		} catch (err) {
			console.error(err);
			if (err.message === 'Data format error') {
				res.status(422).json({ message: 'Data format error during update' });
			} else {
				res.status(500).json({ message: 'Error server during update' });
			}
		}
	}

	// this static function uses the TreeDao and send to the website the error code corresponding (404 for a not found ressource)
	static async deleteTree(req, res) {
		try {
			const result = await treeDao.removeTree(req.params.id);
			if (!result) {
				return res.status(404).json({ message: 'Ressource not found' });
			}
			res.status(200).json({ message: 'Successful Tree deleted' });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: 'Error server' });
		}
	}
}
