
const userModel = require('../models/userModel');

function createUser(req, res) {
    const { username, password } = req.body;
    const user = userModel.getUserByUsername(username);

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

    userModel.createUser(newUser);
    return res.status(201).json({
        code: 201,
        message: 'Usuario creado exitosamente.',
        newUser
    });
}

module.exports = {
    createUser
};
