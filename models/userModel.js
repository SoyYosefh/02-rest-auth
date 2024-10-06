// userModel.js

const bcrypt = require('bcryptjs');
const { ref, get, set, push } = require("firebase/database");
const { db } = require('../conexion'); // Importa la conexión a Firebase

let users = [
	{
		username: 'yosefh',
		password: bcrypt.hashSync('1234567890', 10), // Contraseña encriptada
		apikey: 'yosefh-1234567890' // apikey encriptada
	}
];

// // buscar usuarios
// function getUserByUsername(username) {
// 	return users.find(user => user.username === username);
// }

// // buscar usuarios por apikey
// function getUserByApikey(apikey) {
// 	return users.find(user => user.apikey === apikey);
// }

// // crear usuarios
// function createUser(newUser) {
// 	users.push(newUser);
// }

// Buscar usuario por nombre de usuario
async function getUserByUsername(username) {
	const dbRef = ref(db, 'users');
	const snapshot = await get(dbRef);

	if (snapshot.exists()) {
		const users = snapshot.val();
		return Object.values(users).find(user => user.username === username);
	} else {
		return null;
	}
}

// Buscar usuario por apikey
async function getUserByApikey(apikey) {
	const dbRef = ref(db, 'users');
	const snapshot = await get(dbRef);

	if (snapshot.exists()) {
		const users = snapshot.val();
		return Object.values(users).find(user => user.apikey === apikey);
	} else {
		return null;
	}
}

// Crear usuario
async function createUser(newUser) {
	const newUserRef = push(ref(db, 'users'));
	await set(newUserRef, newUser);
}

module.exports = {
	getUserByUsername,
	getUserByApikey,
	createUser
};
