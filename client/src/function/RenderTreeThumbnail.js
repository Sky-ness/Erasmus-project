export default function renderTreeThumbnail(tree, isExpanded) {
	return (
		`<table>
		<tr>
			<th>Primary key</th>
			<th>Coordonate GPS</th>
			<th>Perimeter</th>
			<th>Number Of Branches</th>
			<th>Height</th>
			<th><button class="toggleEditButton"><img src="images/website/pen2.ico" alt="edit"/><button></th>
		</tr>
		<tr class=\"data\">
			<td>${tree.column1}</td>
			<td>X: ${tree.longitude} | Y: ${tree.latitude}</td>
			<td>base: ${tree.basePerimeter} | at-1m30: ${tree.perimAt1m30}</td>
			<td>number: ${tree.numberOfBranches} | size: ${tree.branch}</td>
			<td>${tree.height}</td>
		</tr>` +
		(!isExpanded
			? `<tr class=\"more\">
				<td colspan=\"5\"><a>more information</a></td>
			</tr>`
			: `<tr>
				<th>Tree Code</th>
				<th>Cavitation</th>
				<th>Trunk shapes</th>
				<th>Trunk torsion</th>
		  	</tr>
		  	<tr>
				<td>${tree.treeCode}</td>
				<td>${tree.cavitation}</td> 
				<td>${tree.trunkShapes}</td> 
				<td>${tree.trunkTorsion}</td>
		  	</tr> 
		  	<tr>
				<th>Nisi</th>
				<th>Land use</th>
				<th>Paratiriseis</th>
		  	</tr>
		  	<tr>
				<td>${tree.nisi}</td> 
				<td>${tree.landUse}</td> 
				<td>${tree.paratiriseis}</td>
		  	</tr>
		 	<tr class=\"less\">
				<a>less information</a>
		  	</tr>`) +
		`</table>`
	);
}
