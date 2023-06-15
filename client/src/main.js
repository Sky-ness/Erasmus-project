import NavigationView from './view/NavigationView.js';
import AddView from './view/AddView.js';
import TreeListView from './view/TreeListView.js';

//--------------------------------------View-----------------------------------------------------

const treeListView = new TreeListView('.viewContent > .treeList');
const navigationView = new NavigationView('nav');
const addView = new AddView('.modal');
