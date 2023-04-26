//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";

import { OliveTree } from "../../server/main/OliveTree";
import OliveTreeListView from "./view/OliveTreeListView";

console.log("hello world");

const linkApi = "";

let oliveTree = new OliveTree("test", 1, 1, 1, 1);

let olive = document.querySelector(".olive-trees .mainView") as HTMLElement;
if (olive) {
  const mainView = new OliveTreeListView(olive, linkApi);
}

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
