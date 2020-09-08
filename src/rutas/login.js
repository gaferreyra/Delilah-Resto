const router = require('express').Router();
const { db, Sequelize } = require('../../conexionDB');
const { app, express } = require('../../index.js');
const { secreto } = require('../../properties.js');
let { respuesta, logueo } = require('../../properties.js');
const jwt = require('jsonwebtoken');
let token = '';

router.post('/', async (req, res) => {
    try {
        const { user, password } = req.body;
        let admin = '';

        const [resultadoQuery, metadata] = await db.query(`SELECT admin FROM usuario WHERE user = '${user}' AND password = '${password}'`);

        if (resultadoQuery == '') {
            console.log('Usuario o contraseña incorrecta');
        } else {
            admin = resultadoQuery[0].admin;
            token = jwt.sign({ user, admin }, secreto);
        }

        respuesta.mensaje = 'Usuario logueado';
        respuesta.resultado = token;
        respuesta.errorTecnico = '';

        res.status(200).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al loguear';
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
});

module.exports = router;