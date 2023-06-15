export default function renderTreeThumbnail(tree) {
	return `
	<div class="thumbnail">
		<div>
			<img class="tree" src="images/olives-tree-pictures/olivetree.jpeg" alt="photo"/>
		</div>
		<div class="container">

			<div class="cell"> Primary key </div>
			<div class="cell"> Coordonate GPS </div>
			<div class="cell"> Perimeter </div>
			<div class="cell"> Number Of Branches </div>
			<div class="cell"> Height </div>
			<div class="cell"> Score </div>
			<div class="cell"> <a href=./update.html?id=${tree.id}><img src="images/website/pen2.ico" alt=edit/></a> </div>
			
			
			<div class="cell"> ${tree.id} </div>
			<div class="cell"> X: ${tree.longitude} | Y: ${tree.latitude} </div>
			<div class="cell"> base: ${tree.base_perimeter} | at-1m30: ${tree.perim_at_1m30} </div>
			<div class="cell"> number: ${tree.number_of_branches} | size: ${tree.branch} </div>
			<div class="cell"> ${tree.height} </div>
			<div class="cell"> ${tree.score} </div>
			<div class="cell">  <a href=./delete.html?id=${tree.id}><img src="images/website/delete.ico" alt=delete/></a></div>

			<div class="last-cell"> <button> more information </button> </div>
			
			<div class="cell hide"> Tree Code </div>
			<div class="cell hide"> Cavitation </div>
			<div class="cell hide"> Trunk shapes </div>
			<div class="cell hide"> Trunk torsion </div>
			<div class="cell hide"> Nisi </div>
			<div class="cell hide"> Land use </div>
			<div class="cell hide"> Paratiriseis </div>


			<div class="cell hide"> ${tree.treecode} </div>
			<div class="cell hide"> ${tree.cavitation} </div> 
			<div class="cell hide"> ${tree.trunk_shapes} </div> 
			<div class="cell hide"> ${tree.trunk_torsion} </div>
			<div class="cell hide"> ${tree.nisi} </div> 
			<div class="cell hide"> ${tree.land_use} </div> 
			<div class="cell hide"> ${tree.paratiriseis} </div>
				
		</div>
	</div>`;
}
