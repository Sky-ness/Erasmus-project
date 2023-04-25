import { OliveTree } from "./model/OliveTree.js";

import OliveTreeListView from "./view/OliveTreeListView.js";
import EditView from "./view/EditView.js";
import AddView from "./view/addView.js";

console.log("hello world");

const linkApi = "";

let oliveTree = new OliveTree();

const mainView = new OliveTreeListView(".olive-trees .mainView", linkApi);

/*
const editView = new EditView(".olive-trees .editView", oliveTree);
const addView = new AddView(".olive-trees .editView");
*/

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
