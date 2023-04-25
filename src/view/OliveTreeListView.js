import View from "./View.js";
export default class OliveTreeListView extends View {
  constructor(element, json) {
    super(element);
    this.oliveTrees = this.refreshData(json);
    this.show();
  }
  refreshData(json) {
    fetch(json)
      .then((response) => response.json())
      .then((data) => {
        this.oliveTrees = data.results;
        displaySinglePage(this.oliveTrees, 10);
      });
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
  filterForm() {}
  displaySinglePage(oliveTrees, number) {}
}
