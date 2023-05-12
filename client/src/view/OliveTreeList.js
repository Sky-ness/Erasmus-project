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
