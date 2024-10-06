const { ref, get, set, push } = require("firebase/database");
const { db } = require('../conexion'); // Importa la conexión a Firebase

// Obtener todos los usuarios
async function getAllUsers() {
    const dbRef = ref(db, 'users');
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return [];
    }
}

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

// Crear un nuevo usuario, permitiendo pasar un nombre personalizado o generar uno automáticamente
async function createUser(newUser) {
    const dbRef = ref(db, 'users');
    const snapshot = await get(dbRef);
    let lastUserNumber = 0;

    // Verificar si existen usuarios y obtener el último número de usuario
    if (snapshot.exists()) {
        const users = snapshot.val();
        const userKeys = Object.keys(users);
        
        userKeys.forEach(key => {
            const userName = users[key].username;
            const match = userName.match(/Usuario (\d+)/);  // Extrae el número del nombre
            if (match) {
                const currentUserNumber = parseInt(match[1], 10);
                if (currentUserNumber > lastUserNumber) {
                    lastUserNumber = currentUserNumber;
                }
            }
        });
    }

    // Si no se proporcionó un 'username', generar uno dinámico
    const newUserName = newUser.username || `Usuario ${lastUserNumber + 1}`;

    const userToSave = {
        username: newUserName,
        password: newUser.password,  // La contraseña ya está encriptada en el controlador
        apikey: newUser.apikey        // La apikey también ya está generada en el controlador
    };

    // Guardar el nuevo usuario en Firebase
    await set(ref(db, `users/${newUserName}`), userToSave);  // Usar el nuevo nombre como clave en Firebase
    return userToSave;
}

module.exports = {
    getUserByUsername,
    createUser,
    getAllUsers
};
