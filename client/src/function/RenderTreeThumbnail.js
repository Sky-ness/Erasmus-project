export default function renderTreeThumbnail(tree) {
	return `<table>
		<tr>
			<th>Primary key</th>
			<th>Coordonate GPS</th>
			<th>Perimeter</th>
			<th>Number Of Branches</th>
			<th>Height</th>
			<th><button class="toggleEditButton"><a href=./update.html?id=${tree.id} </a><img src="images/website/pen2.ico" alt="edit"/><button></th>
			<th><button class="toggleDeleteButton"><a href=./delete.html?id=${tree.id} </a><img src="images/website/delete.jpeg" alt="del"/><button></th>
			
		</tr>
		<tr class=\"data\">
			<td>${tree.id}</td>
			<td>X: ${tree.longitude} | Y: ${tree.latitude}</td>
			<td>base: ${tree.base_perimeter} | at-1m30: ${tree.perim_at_1m30}</td>
			<td>number: ${tree.number_of_branches} | size: ${tree.branch}</td>
			<td>${tree.height}</td>
			<td>${tree.score}</td>
		</tr>
		<tr class=\"expand\">
			<td colspan=\"5\"><button>more information</button></td>
		</tr>
		<table class=\"expanded\">
			<tr>
				<th>Tree Code</th>
				<th>Cavitation</th>
				<th>Trunk shapes</th>
				<th>Trunk torsion</th>
			</tr>
			<tr>
				<td>${tree.treecode}</td>
				<td>${tree.cavitation}</td> 
				<td>${tree.trunk_shapes}</td> 
				<td>${tree.trunk_torsion}</td>
			</tr> 
			<tr>
				<th>Nisi</th>
				<th>Land use</th>
				<th>Paratiriseis</th>
			</tr>
			<tr>
				<td>${tree.nisi}</td> 
				<td>${tree.land_use}</td> 
				<td>${tree.paratiriseis}</td>
			</tr>
		</table>
	</table>`;
}
