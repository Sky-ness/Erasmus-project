//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";

import OliveTree from "./model/OliveTree";
import OliveTreeListView from "./view/OliveTreeListView";

console.log("hello world");

//--------------------------------------jeu de données-------------------------------------------
// const linkApi = "";
const json = "../../database/JSON file/olivesTrees.json";

//--------------------------------------View-----------------------------------------------------
// const mainView = new OliveTreeListView(olive, json);
// const editView = new EditView(".olive-trees .editView", oliveTree);
// const addView = new AddView(".olive-trees .editView");

const mainview = document.querySelector(
  ".olive-trees .mainView"
) as HTMLElement;

let oliveTrees = [];
fetch(json)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // oliveTrees = data.results;
  });

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
