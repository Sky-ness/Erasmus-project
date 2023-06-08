import Weight from './Weight.js';

const weight = new Weight();

export default class CalculOliveTree {
	constructor(
		id,
		treecode,
		perim_at_1m30,
		base_perimeter,
		height,
		cavitation,
		trunk_shapes,
		trunk_torsion,
		score
	) {
		this.id = id;
		this.treecode = treecode;
		this.perim_at_1m30 = perim_at_1m30 * weight.perimeter;
		this.base_perimeter = base_perimeter * weight.base_perimeter;
		this.height = height * weight.height;
		this.cavitation = cavitation * weight.formation_caverns;
		this.trunk_shapes = trunk_shapes * weight.reliefs;
		this.trunk_torsion = trunk_torsion * weight.crookedness_trunk;
		this.score = score;
	}
}
