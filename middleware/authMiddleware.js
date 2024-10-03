// authmiddleware.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../controllers/authController').JWT_SECRET;
const userModel = require('../models/userModel');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];

    // const token = authHeader;

    if (!token) {
        return res.status(401).json({
            code: 401,
            message: 'Como asi bro? Ni has iniciado sesion, andele, vayase a logear.'
        });
    }

    // validar si se envia la apikey en el body
    const apikey = req.body.apikey;
    if (!apikey) {
        return res.status(401).json({
            code: 401,
            message: 'No se ha enviado la apikey.'
        });
    }

    // validar si la apikey es correcta con los usuarios
    const user = userModel.getUserByApikey(apikey);
    if (!user) {
        return res.status(401).json({
            code: 401,
            message: 'La apikey no es correcta o no existe.'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            switch (err.name) {
                case 'JsonWebTokenError':
                    return res.status(403).json({
                        code: 401,
                        message: 'A donde papi, que quieres intentar, hagalas cosas bien, a logearse!'
                    });
                case 'TokenExpiredError':
                    return res.status(401).json({
                        code: 401,
                        message: 'Ya caducaste karnal, vuelve a logearte.'
                    });
                default:
                    return res.status(400).json({
                        code: 401,
                        message: 'Al chile ni yo se que paso, pero no puedes pasar.'
                    });
            }
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;