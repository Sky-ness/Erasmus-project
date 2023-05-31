//import EditView from "./view/EditView.js";
//import AddView from "./view/addView.js";

import NavigationView from './view/navigationView.js';
import AddView from './view/AddView.js';
import TreeListView from './view/TreeListView.js';
import EditView from './view/EditView.js';

console.log('hello world');

//--------------------------------------View-----------------------------------------------------
const treeListView = new TreeListView('.viewContent > .treeList');
const navigationView = new NavigationView('nav');
const addView = new AddView('.modal');
// const editView = new EditView('.editView', oliveTree);
