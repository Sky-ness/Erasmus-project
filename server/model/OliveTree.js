import Weight from './Weight.js';

const weight = new Weight();

export default class OliveTree {
	id;
	treecode;
	longitude;
	latitude;
	nisi;
	perim_at_1m30;
	base_perimeter;
	height;
	branch;
	number_of_branches;
	cavitation;
	trunk_shapes;
	trunk_torsion;
	land_use;
	paratiriseis;
	score;
	constructor(
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
	) {
		this.id = id;
		this.treecode = treecode;
		this.longitude = longitude;
		this.latitude = latitude;
		this.nisi = nisi;
		this.perim_at_1m30 = perim_at_1m30;
		this.base_perimeter = base_perimeter;
		this.height = height;
		this.branch = branch;
		this.number_of_branches = number_of_branches;
		this.cavitation = cavitation;
		this.trunk_shapes = trunk_shapes;
		this.trunk_torsion = trunk_torsion;
		this.land_use = land_use;
		this.paratiriseis = paratiriseis;
		this.score =
			weight.base_perimeter * this.base_perimeter + weight.height * this.height;
	}
}
