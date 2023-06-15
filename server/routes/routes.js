import express from 'express';
import { Controller } from '../controller/Controller.js';

const router = express.Router();

router.get('/', (req, res) => Controller.getAllTrees(req, res));
router.get('/:id', (req, res) => Controller.getTreeById(req, res));
router.get('/a/ranking', (req, res) => Controller.getTreeRanked(req, res));
router.post('/', (req, res) => Controller.createTree(req, res));
router.patch('/:id', (req, res) => Controller.updateTree(req, res));
router.delete('/:id', (req, res) => Controller.deleteTree(req, res));

export default router;
