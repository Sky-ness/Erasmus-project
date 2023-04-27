//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";

import OliveTree from "./model/OliveTree.js";
import OliveTreeListView from "./view/OliveTreeListView.js";

console.log("hello world");

//--------------------------------------jeu de données-------------------------------------------
// const linkApi = "";
const json = "/olivesTrees.json";

//--------------------------------------View-----------------------------------------------------
// const mainView = new OliveTreeListView(olive, json);
// const editView = new EditView(".olive-trees .editView", oliveTree);
// const addView = new AddView(".olive-trees .editView");

const mainView = document.querySelector(".olive-trees .mainView");

const addView = document.querySelector(".olive-trees .addView");

addView.style.display = "none";

let oliveTrees = [];
fetch(json)
  .then((response) => response.json())
  .then((data) => {
    oliveTrees = data.results;
    displayTrees(oliveTrees);
  });

function displayTrees(data) {
  data.forEach((oliveTree) => {
    mainView.innerHTML +=
      `<p>${oliveTree.column1}<p>` +
      `<p>${oliveTree.treeCode}<p>` +
      `<p>${oliveTree.longitude}<p>` +
      `<p>${oliveTree.latitude}<p>` +
      `<p>${oliveTree.nisi}<p>` +
      `<p>${oliveTree.perimAt1m30}<p>` +
      `<p>${oliveTree.basePerimeter}<p>` +
      `<p>${oliveTree.height}<p>` +
      `<p>${oliveTree.branch}<p>` +
      `<p>${oliveTree.numberOfBranches}<p>` +
      `<p>${oliveTree.cavitation}<p>` +
      `<p>${oliveTree.trunkShapes}<p>` +
      `<p>${oliveTree.trunkTorsion}<p>` +
      `<p>${oliveTree.landUse}<p>` +
      `<p>${oliveTree.paratiriseis}<p>`;
  });
}
/*
function refreshData(json){
    fetch(json)
        .then(response => response.json())
    	.then(data => olivesTree = data.results);
}
function splitTree(numberinOnePage){

}
function filter(){

}
function displayOliveTree(oliveTree){

}
function addOliveTree(oliveTree){

}
function editOliveTree(oliveTree) {
  
}
*/
