export default class OliveTree {
	column1;
	treeCode;
	longitude;
	latitude;
	nisi;
	perimAt1m30;
	basePerimeter;
	height;
	branch;
	numberOfBranches;
	cavitation;
	trunkShapes;
	trunkTorsion;
	landUse;
	paratiriseis;

	constructor(
		column1,
		treeCode,
		longitude,
		latitude,
		nisi,
		perimAt1m30,
		basePerimeter,
		height,
		branch,
		numberOfBranches,
		cavitation,
		trunkShapes,
		trunkTorsion,
		landUse,
		paratiriseis
	) {
		this.column1 = column1;
		this.treeCode = treeCode;
		this.longitude = longitude;
		this.latitude = latitude;
		this.nisi = nisi;
		this.perimAt1m30 = perimAt1m30;
		this.basePerimeter = basePerimeter;
		this.height = height;
		this.branch = branch;
		this.numberOfBranches = numberOfBranches;
		this.cavitation = cavitation;
		this.trunkShapes = trunkShapes;
		this.trunkTorsion = trunkTorsion;
		this.landUse = landUse;
		this.paratiriseis = paratiriseis;
	}
}
