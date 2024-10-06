const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');



async function createUser(req, res) {
    try {
        const { username, password } = req.body; // Ahora sí pasamos 'username'
        console.log("Creating user with username and password:", username, password);

        // Verificar si ya existe un usuario con ese nombre
        const existingUser = await userModel.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({
                code: 400,
                message: 'Ya existe un usuario con ese nombre.'
            });
        }

        // Generar la API Key
        const apikey = bcrypt.hashSync(`${username}-${password}`, 10);
        const newUser = {
            username,  // Utilizamos el username proporcionado
            password: bcrypt.hashSync(password, 10),
            apikey
        };

        console.log("Generated user:", newUser);

        // Guardar el nuevo usuario
        const createdUser = await userModel.createUser(newUser);

        return res.status(201).json({
            code: 201,
            message: 'Usuario creado exitosamente.',
            user: createdUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: 'Error al crear el usuario.',
            error
        });
    }
}

module.exports = {
    createUser
};

