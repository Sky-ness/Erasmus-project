import CalculOliveTree from './CalculOliveTree.js';

export default class Ranking {
	constructor(treeList) {
		this.treeList = treeList;

		this.idealTree = new CalculOliveTree(
			'IDEALTREE',
			'IT',
			Math.max(...treeList.map(tree => tree.perim_at_1m30)),
			Math.max(...treeList.map(tree => tree.base_perimeter)),
			Math.max(...treeList.map(tree => tree.height)),
			Math.max(...treeList.map(tree => tree.cavitation)),
			Math.max(...treeList.map(tree => tree.trunk_shapes)),
			Math.max(...treeList.map(tree => tree.trunk_torsion))
		);
		this.worseTree = new CalculOliveTree(
			'WORSETREE',
			'WT',
			Math.min(
				...treeList
					.map(tree => tree.perim_at_1m30)
					.filter(value => typeof value === 'number')
			),
			Math.min(
				...treeList
					.map(tree => tree.base_perimeter)
					.filter(value => typeof value === 'number')
			),
			Math.min(
				...treeList
					.map(tree => tree.height)
					.filter(value => typeof value === 'number')
			),
			Math.min(
				...treeList
					.map(tree => tree.cavitation)
					.filter(value => typeof value === 'number')
			),
			Math.min(
				...treeList
					.map(tree => tree.trunk_shapes)
					.filter(value => typeof value === 'number')
			),
			Math.min(
				...treeList
					.map(tree => tree.trunk_torsion)
					.filter(value => typeof value === 'number')
			)
		);

		this.treeList.forEach(tree => {
			tree.score = this.scoring(tree);
		});
	}
	scoring(tree) {
		const scoreIntPos =
			Math.pow(tree.perim_at_1m30 - this.idealTree.perim_at_1m30, 2) +
			Math.pow(tree.base_perimeter - this.idealTree.base_perimeter, 2) +
			Math.pow(tree.height - this.idealTree.height, 2) +
			Math.pow(tree.cavitation - this.idealTree.cavitation, 2) +
			Math.pow(tree.trunk_shapes - this.idealTree.trunk_shapes, 2) +
			Math.pow(tree.trunk_torsion - this.idealTree.trunk_torsion, 2);
		const scoreIntNeg =
			Math.pow(tree.perim_at_1m30 - this.worseTree.perim_at_1m30, 2) +
			Math.pow(tree.base_perimeter - this.worseTree.base_perimeter, 2) +
			Math.pow(tree.height - this.worseTree.height, 2) +
			Math.pow(tree.cavitation - this.worseTree.cavitation, 2) +
			Math.pow(tree.trunk_shapes - this.worseTree.trunk_shapes, 2) +
			Math.pow(tree.trunk_torsion - this.worseTree.trunk_torsion, 2);

		return parseFloat(scoreIntNeg / (scoreIntPos + scoreIntNeg)).toFixed(4);
	}
	ordering(order) {
		if (order === 'DESC') {
			this.treeList.sort((a, b) => a.score - b.score);
		}
		if (order === 'ASC') {
			this.treeList.sort((a, b) => b.score - a.score);
		}
		return this.treeList;
	}
}
