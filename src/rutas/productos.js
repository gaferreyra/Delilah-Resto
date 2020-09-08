const router = require('express').Router();
const { db, Sequelize } = require('../../conexionDB');
const { autenticar } = require('../middlewares/autenticar.js');
const { validarAdmin } = require('../middlewares/validarAdmin.js');
let { respuesta } = require('../../properties.js');
const tabla = 'Producto';

router.get('/:id', autenticar, async (req, res) => {
    try {
        let id = '';

        if (req.params.id.toUpperCase() === 'ALL') {
            id = null;
        } else {
            id = req.params.id;
        }
        const [resultadoQuery, metadata] = await db.query(`SELECT * FROM producto WHERE ${id} is null OR id = ${id}`);

        respuesta.mensaje = 'Consulta de ' + tabla;
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        res.status(200).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al consutar el ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

router.post('/', autenticar, validarAdmin, async (req, res) => {
    try {
        const { descripcion, precio, imagen } = req.body;

        const [resultadoQuery, metadata] = await db.query(`INSERT INTO producto (id, descripcion, precio, imagen) VALUES (NULL, '${descripcion}', ${precio}, '${imagen}')`);

        respuesta.mensaje = tabla + ' cargado';
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        res.status(201).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al insertar el ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})


router.put('/:id', autenticar, validarAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const updateCol = req.body;
        let updateSet = '';

        for (prop in updateCol) {
            updateSet = updateSet + prop + ' = ' + "'" + updateCol[prop] + "'" + ', ';
        };

        updateSet = updateSet.trim().slice(0, updateSet.trim().length - 1);

        const [resultadoQuery, metadata] = await db.query(`UPDATE producto SET ${updateSet} WHERE id = ${id}`);

        respuesta.mensaje = tabla + ' actualizado';
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        res.status(200).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al actualizar el ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

router.delete('/:id', autenticar, validarAdmin, async (req, res) => {
    try {
        const id = req.params.id;

        const [resultadoQuery, metadata] = await db.query(`DELETE FROM producto WHERE id = ${id}`);

        respuesta.mensaje = tabla + ' borrado';
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        res.status(200).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al borrar el ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

module.exports = router;