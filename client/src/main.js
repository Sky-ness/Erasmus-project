import NavigationView from './view/navigationView.js';
import AddView from './view/AddView.js';
import TreeListView from './view/TreeListView.js';

console.log('hello world');

//--------------------------------------View-----------------------------------------------------
const treeListView = new TreeListView('.viewContent > .treeList');
const navigationView = new NavigationView('nav');
const addView = new AddView('.modal');
