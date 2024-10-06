// authmiddleware.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../controllers/authController').JWT_SECRET;
const userModel = require('../models/userModel');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];
    const apikey = req.body.apikey;

    // Verifica si se ha enviado la apikey
    if (apikey) {
        // Validar si la apikey es correcta con los usuarios
        const user = await userModel.getUserByApikey(apikey);
        if (!user) {
            return res.status(401).json({
                code: 401,
                message: 'La apikey no es correcta o no existe.'
            });
        }
        // Si la apikey es válida, continua hacia el controlador
        req.user = user; // Asigna el usuario validado por apikey al request
        return next();
    }

    // Si no se envió la apikey, se verifica el token
    if (!token) {
        return res.status(401).json({
            code: 401,
            message: 'No se ha enviado el token o la apikey.'
        });
    }

    // Verifica el token JWT
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            switch (err.name) {
                case 'JsonWebTokenError':
                    return res.status(403).json({
                        code: 401,
                        message: 'No puedes pasar, token inválido. Vuelve a logearte.'
                    });
                case 'TokenExpiredError':
                    return res.status(401).json({
                        code: 401,
                        message: 'No puedes pasar, token expirado. Vuelve a logearte.'
                    });
                default:
                    return res.status(400).json({
                        code: 401,
                        message: 'No puedes pasar, token inválido. Vuelve a logearte.'
                    });
            }
        }
        req.user = user; // Asigna el usuario validado por token al request
        next();
    });
}

module.exports = authenticateToken;