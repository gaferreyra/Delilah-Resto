const router = require('express').Router();
const { db, Sequelize } = require('../../conexionDB');
const { autenticar } = require('../middlewares/autenticar.js');
const { validarAdmin } = require('../middlewares/validarAdmin.js');
let { respuesta } = require('../../properties.js');
const tabla = 'Usuario';

router.get('/:id', autenticar, validarAdmin, async (req, res) => {
    try {
        let id = '';

        if (req.params.id.toUpperCase() === 'ALL') {
            id = null;
        } else {
            id = req.params.id;
        }

        const [resultadoQuery, metadata] = await db.query(`SELECT * FROM usuario WHERE ${id} is null OR id = ${id}`);

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
        const { nombre, apellido, email, telefono, direccion, user, password } = req.body;

        const [resultadoQuery, metadata] = await db.query(`INSERT INTO usuario (id, nombre, apellido, email, telefono, direccion, user, password) 
        VALUES (NULL, "${nombre}", "${apellido}", "${email}", "${telefono}", "${direccion}", "${user}", "${password}")`);

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

        const [resultadoQuery, metadata] = await db.query(`UPDATE usuario SET ${updateSet} WHERE id = ${id}`);

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

        const [resultadoQuery, metadata] = await db.query(`DELETE FROM usuario WHERE id = ${id}`);

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