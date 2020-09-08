let { secreto } = require('../../properties');
const jwt = require('jsonwebtoken');

let validarAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (token == '' || token == undefined) {
            res.json('No esta logueado');
        } else {
            const usuarioToken = jwt.verify(token, secreto);
            if (usuarioToken.admin == true) {
                return next();
            } else {
                res.json('No es Admin');
            };
        };

    } catch (error) {
        res.json(error);
    }
}

module.exports = { validarAdmin };