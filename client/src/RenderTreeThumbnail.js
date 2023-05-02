export default function renderTreeThumbnail(tree) {
	return `<table>
				<tr>
					<th>Primary key</th>
					<th>Coordonate GPS</th>
					<th>Perimeter</th>
					<th>Number Of Branches</th>
					<th>Height</th>
					<th><button class="toggleEditButton"><img src="images/website/pen2.ico" alt="edit"/><button></th>
				</tr>
				<tr>
					<td>${tree.column1}</td>
					<td>X: ${tree.longitude} | Y: ${tree.latitude}</td>
					<td>base: ${tree.basePerimeter} | at-1m30: ${tree.perimAt1m30}</td>
					<td>number: ${tree.numberOfBranches} | size: ${tree.branch}</td>
					<td>${tree.height}</td>
				</tr>
				<tr>
					<td colspan=\"5\"><a href=\"#\">more information</a></td>
				</tr>
			</table>`;
}
