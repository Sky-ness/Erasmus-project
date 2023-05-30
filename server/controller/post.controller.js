import getConnect from '../utils/connect.js';
const client = getConnect();

async function getTree(treeId) {
	const text = `SELECT * FROM commandes WHERE id = $1`;
	const values = [treeId];
	return client.query(text, values);
}

async function registerPerson(person) {
	const text = `
      INSERT INTO people (fullname, gender, phone, age)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
	const values = [person.fullname, person.gender, person.phone, person.age];
	return client.query(text, values);
}

async function updatePersonName(personId, fullname) {
	const text = `UPDATE people SET fullname = $2 WHERE id = $1`;
	const values = [personId, fullname];
	return pool.query(text, values);
}

async function removePerson(personId) {
	const text = `DELETE FROM people WHERE id = $1`;
	const values = [personId];
	return pool.query(text, values);
}

module.exports = { getTree: getTree };
