const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "AVerAdivinameEstaContraseniaHackerAVerSiPuedesSanaSanaColitaDeRana";
const JWT_EXPIRES_IN = '180s';

async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Verificación de que el usuario y contraseña estén presentes en la solicitud
        if (!username || !password) {
            return res.status(400).json({
                code: 400,
                message: 'No se proporcionaron el usuario o la contraseña.'
            });
        }

        // Búsqueda del usuario en la base de datos (recuerda usar await)
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({
                code: 401,
                message: 'A ese no lo conocen ni en su casa.'
            });
        }

        // Verificación de la contraseña
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                code: 401,
                message: '¿Apoco no te sabes tu contraseña, karnal?'
            });
        }

        // Generación del token JWT
        const token = jwt.sign(
            { username: user.username },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Respuesta con éxito y el token generado
        return res.json({
            code: 200,
            message: 'Hasta que le atinaste.',
            token
        });

    } catch (error) {
        // Manejo de errores no previstos
        console.error('Error en el login:', error);
        return res.status(500).json({
            code: 500,
            message: 'Hubo un error interno. Intenta de nuevo más tarde.'
        });
    }
}

module.exports = {
    login,
    JWT_SECRET
};
