const router = require('express').Router();
const { db, Sequelize } = require('../../conexionDB');
let { respuesta } = require('../../properties.js');
const tabla = 'Estados';

router.get('/', async (req, res) => {
    try {
        const [resultadoQuery, metadata] = await db.query(`SELECT * FROM estado_pedido`);

        respuesta.mensaje = 'Consulta de ' + tabla;
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        res.status(200).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al consutar los ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
});

module.exports = router;