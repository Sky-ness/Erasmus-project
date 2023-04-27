export default class OliveTree {
  treeCode;
  height;
  branch;
  trunk;
  trunkAt1m30;

  constructor(treeCode, height, branch, trunk, trunkAt1m30) {
    this.treeCode = treeCode;
    this.height = height;
    this.branch = branch;
    this.trunk = trunk;
    this.trunkAt1m30 = trunkAt1m30;
  }
}
