export default class OliveTreeList {
	oliveTrees;

	constructor(api) {
		this.oliveTrees = this.loadData(api);
	}

	async loadData(api) {
		const response = await fetch(api);
		const data = await response.json();
		return data;
	}

	async sliceData(index, treeByPage) {
		if (index == 0)
			return this.oliveTrees.then(results => results.slice(index, treeByPage));
		else
			return this.oliveTrees.then(results =>
				results.slice(treeByPage * index, treeByPage + treeByPage * index)
			);
	}

	async filterData(filter) {
		return this.oliveTrees.then(results =>
			results.filter(tree =>
				tree.column1.toLowerCase().includes(filter.toLowerCase())
			)
		);
	}

	// async ranking(method, weight) {
	// 	this.oliveTrees.then(results => {
	// 		results.forEach(element => {
	// 			let score =
	// 				element.column1 * weight.a +
	// 				element.treeCode * weight.b +
	// 				element.longitude * weight.c +
	// 				element.latitude * weight.d +
	// 				element.nisi * weight.e +
	// 				element.perimAt1m30 * weight.f +
	// 				element.basePerimeter * weight.g +
	// 				element.height * weight.h +
	// 				element.branch * weight.i +
	// 				element.numberOfBranches * weight.j +
	// 				element.cavitation * weight.k +
	// 				element.trunkShapes * weight.l +
	// 				element.trunkTorsion * weight.m +
	// 				element.landUse * weight.n;
	// 		});
	// 		results.sort((a, b) => a.score - b.score);
	// 	});
	// }

	/* Pour une api
  add(oliveTree) {
    fetch("https://mon-api.com/elements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(oliveTree),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  remove(primaryKey) {
    fetch("https://mon-api.com/elements/" + primaryKey, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  edit(primaryKey, oliveTree) {
    fetch("https://mon-api.com/elements/" + primaryKey, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(oliveTree),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  */
}
function compareWeight(weightCriteria, maxValue, minValue) {
	return 0;
}
