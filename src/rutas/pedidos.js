const router = require('express').Router();
const { db, Sequelize } = require('../../conexionDB');
const { autenticar } = require('../middlewares/autenticar.js');
const { validarAdmin } = require('../middlewares/validarAdmin.js');
let { respuesta } = require('../../properties.js');
const tabla = 'Pedido';
let pedido = {
    pedidoMaster: '',
    pedidoDetail: ''
};

router.get('/', autenticar, validarAdmin, async (req, res) => {
    try {
        const id = req.params.id;

        const [resultadoQuery, metadata] = await db.query(`SELECT 	pe.id_estado,
                                                                    est.descripcion_estado_admin estado,
                                                                    pe.fecha,
                                                                    pe.id numero_pedido,
                                                                    GROUP_CONCAT(CONCAT(dp.cantidad, 'x', pro.descripcion)) descripcion,
                                                                    fop.descripcion forma_pago,
                                                                    SUM(pro.precio * dp.cantidad ) total,
                                                                    usu.nombre, 
                                                                    usu.apellido,
                                                                    usu.direccion
                                                            FROM 	pedido pe,
                                                                    detalle_pedido dp,
                                                                    producto pro,
                                                                    usuario usu,
                                                                    estado_pedido est,
                                                                    forma_pago fop		
                                                            WHERE	dp.id_pedido = pe.id
                                                            AND		dp.id_producto = pro.id
                                                            AND 	pe.id_usuario = usu.id
                                                            AND		pe.id_estado = est.id
                                                            AND		pe.id_forma_pago = fop.id
                                                            GROUP BY pe.id_estado, est.descripcion_estado_admin, pe.fecha, pe.id, 
                                                                    fop.descripcion, usu.nombre, usu.apellido, usu.direccion
                                                            ORDER BY pe.id_estado, pe.id`);


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
});

router.get('/:id', autenticar, async (req, res) => {
    try {
        const id = req.params.id;

        const [resultadoQuery, metadata] = await db.query(`SELECT 	pe.id_estado,
                                                                    est.descripcion_estado_admin estadoAdmin,
                                                                    est.descripcion_estado_cliente estadoCliente,
                                                                    pe.fecha,
                                                                    pe.id numeroPedido,
                                                                    fop.descripcion formaPago,
                                                                    usu.nombre, 
                                                                    usu.apellido,
                                                                    usu.direccion,
                                                                    usu.email,
                                                                    usu.telefono
                                                            FROM 	pedido pe,
                                                                    usuario usu,
                                                                    estado_pedido est,
                                                                    forma_pago fop		
                                                            WHERE	pe.id_usuario = usu.id
                                                            AND		pe.id_estado = est.id
                                                            AND		pe.id_forma_pago = fop.id
                                                            AND     pe.id = ${id}`);

        const [resultadoQuery2, metadata2] = await db.query(`SELECT dp.id_pedido,
                                                                    pro.descripcion,
                                                                    pro.precio, 
                                                                    dp.cantidad,
                                                                    '' imagen
                                                            FROM 	detalle_pedido dp,
                                                                    producto pro
                                                            WHERE	dp.id_producto = pro.id
                                                            AND		dp.id_pedido = ${id}`);

        pedido.pedidoMaster = resultadoQuery;
        pedido.pedidoDetail = resultadoQuery2;

        respuesta.mensaje = 'Consulta de ' + tabla;
        respuesta.resultado = pedido;
        respuesta.errorTecnico = '';

        res.status(200).send(respuesta);
    } catch (error) {
        respuesta.mensaje = 'Ocurrio un error al consutar el ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

router.post('/:id_usuario/:id_forma_pago/:id_estado', autenticar, async (req, res) => {
    const t = await db.transaction();
    try {
        const id_usuario = req.params.id_usuario;
        const id_forma_pago = req.params.id_forma_pago;
        const id_estado = req.params.id_estado;
        const detalleProducto = req.body;

        const [resultadoQuery, metadata] = await db.query(`INSERT INTO pedido (id, id_usuario, id_estado, id_forma_pago, fecha) VALUES (null, ${id_usuario}, ${id_estado}, ${id_forma_pago}, SYSDATE())`, { transaction: t });

        for (const i of detalleProducto) {
            await db.query(`INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad) VALUES (${resultadoQuery}, ${i.id_producto}, ${i.cantidad})`, { transaction: t });
        }

        respuesta.mensaje = tabla + ' cargado';
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        await t.commit();

        res.status(201).send(respuesta);
    } catch (error) {
        await t.rollback();
        respuesta.mensaje = 'Ocurrio un error al insertar el ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

router.delete('/:id', autenticar, validarAdmin, async (req, res) => {
    const t = await db.transaction();
    try {
        const id = req.params.id;

        await db.query(`DELETE FROM detalle_pedido WHERE id_pedido = ${id}`, { transaction: t });
        const [resultadoQuery, metadata] = await db.query(`DELETE FROM pedido WHERE id = ${id}`, { transaction: t });

        respuesta.mensaje = tabla + ' borrado';
        respuesta.resultado = resultadoQuery;
        respuesta.errorTecnico = '';

        await t.commit();

        res.status(200).send(respuesta);
    } catch (error) {
        await t.rollback();
        respuesta.mensaje = 'Ocurrio un error al borrar el ' + tabla;
        respuesta.resultado = -1;
        respuesta.errorTecnico = error;
        res.status(404).send(respuesta);
    }
})

router.put('/:id/:id_estado', autenticar, validarAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const id_estado = req.params.id_estado;

        const [resultadoQuery, metadata] = await db.query(`UPDATE pedido SET id_estado = ${id_estado} WHERE id = ${id}`);

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

module.exports = router;