const router = require('express').Router();
const { db, Sequelize } = require('../../conexionDB');
let { respuesta } = require('../../properties.js');
const tabla = 'Favoritos';

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [resultadoQuery, metadata] = await db.query(`SELECT 	fav.id_producto,
                                                                    pro.descripcion,
                                                                    pro.precio,
                                                                    pro.imagen
                                                            FROM 	favoritos fav,
                                                                    producto pro
                                                            WHERE	fav.id_producto = pro.id
                                                            AND 	fav.id_usuario = ${id}`);

        respuesta.mensaje = 'Consulta de ' + tabla;
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        res.status(200).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al consutar ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

router.post('/:id_usuario/:id_producto', async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario;
        const id_producto = req.params.id_producto;

        const [resultadoQuery, metadata] = await db.query(`INSERT INTO favoritos (id_usuario, id_producto) VALUES ( ${id_usuario}, ${id_producto})`);

        respuesta.mensaje = tabla + ' cargados';
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        res.status(201).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al insertar ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

router.delete('/:id_usuario/:id_producto', async (req, res) => {
    try {
        const id_usuario = req.params.id_usuario;
        const id_producto = req.params.id_producto;

        const [resultadoQuery, metadata] = await db.query(`DELETE FROM favoritos WHERE id_usuario = ${id_usuario} and id_producto = ${id_producto}`);

        respuesta.mensaje = tabla + ' borrados';
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        res.status(200).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al borrar ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

module.exports = router;