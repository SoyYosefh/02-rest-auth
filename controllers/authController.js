//authController.js
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "AVerAdivinameEstaContraseniaHackerAVerSiPuedesSanaSanaColitaDeRana";
const JWT_EXPIRES_IN = '120s';

async function login(req, res) {
    const { username, password } = req.body;
    const user = userModel.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ code: 401, message: 'A ese no lo conocen ni en su casa' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ code: 401, message: 'Apoco no te sabes tu contraseña karnal?' });
    }

    const token = jwt.sign(
        { username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
    return res.json({
        code: 200,
        message: 'Hasta que le atinaste',
        token
    });
}

module.exports = {
    login,
    JWT_SECRET
};