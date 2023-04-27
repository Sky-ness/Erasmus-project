export default class OliveTree {
  treeCode: string;
  height: number;
  branch: number;
  trunk: number;
  trunkAt1m30: number;

  constructor(
    treeCode: string,
    height: number,
    branch: number,
    trunk: number,
    trunkAt1m30: number
  ) {
    this.treeCode = treeCode;
    this.height = height;
    this.branch = branch;
    this.trunk = trunk;
    this.trunkAt1m30 = trunkAt1m30;
  }
}
