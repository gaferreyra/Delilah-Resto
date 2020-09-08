let { secreto } = require('../../properties');
const jwt = require('jsonwebtoken');

let autenticar = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (token == '' || token == undefined) {
            res.json('No esta logueado');
        } else {
            jwt.verify(token, secreto);
            return next();
        };

    } catch (error) {
        res.json(error);
    }
}

module.exports = { autenticar };