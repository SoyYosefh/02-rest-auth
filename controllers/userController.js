
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await userModel.getUserByUsername(username);
    if (user) {
        return res.status(400).json({
            code: 400,
            message: 'Ya existe un usuario con ese nombre.'
        });
    }

    const apikey = bcrypt.hashSync(`${username}-${password}`, 10);
    const newUser = {
        username,
        password: bcrypt.hashSync(password, 10),
        apikey
    };
    console.log(newUser);

    await userModel.createUser(newUser);
    return res.status(201).json({
        code: 201,
        message: 'Usuario creado exitosamente.',
        newUser
    });
}

module.exports = {
    createUser
};
