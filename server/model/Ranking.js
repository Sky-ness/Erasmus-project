import OliveTree from './OliveTree.js';

export default class Ranking {
	constructor(treeList) {
		this.idealTree = new OliveTree(
			'IDEALTREE',
			'IT',
			null,
			null,
			Math.max(...treeList.map(tree => tree.nisi)),
			Math.max(...treeList.map(tree => tree.perim_at_1m30)),
			Math.max(...treeList.map(tree => tree.base_perimeter)),
			Math.max(...treeList.map(tree => tree.height)),
			Math.max(...treeList.map(tree => tree.branch)),
			Math.max(...treeList.map(tree => tree.number_of_branches)),
			Math.max(...treeList.map(tree => tree.cavitation)),
			Math.max(...treeList.map(tree => tree.trunk_shapes)),
			Math.max(...treeList.map(tree => tree.trunk_torsion)),
			null,
			null
		);
		this.worseTree = new OliveTree(
			'WORSETREE',
			'WT',
			null,
			null,
			Math.min(
				...treeList
					.map(tree => tree.nisi)
					.filter(value => typeof value === 'number')
			),
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
					.map(tree => tree.branch)
					.filter(value => typeof value === 'number')
			),
			Math.min(
				...treeList
					.map(tree => tree.number_of_branches)
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
			),
			null,
			null
		);
	}
}
