// userModel.js

const bcrypt = require('bcryptjs');

let users = [
	{
		username: 'yosefh',
		password: bcrypt.hashSync('1234567890', 10), // Contraseña encriptada
		apikey: 'yosefh-1234567890' // apikey encriptada
	}
];

// buscar usuarios
function getUserByUsername(username) {
	return users.find(user => user.username === username);
}

// buscar usuarios por apikey
function getUserByApikey(apikey) {
	return users.find(user => user.apikey === apikey);
}

// crear usuarios
function createUser(newUser) {
	users.push(newUser);
}

module.exports = {
	getUserByUsername,
	getUserByApikey,
	createUser
};
