const express = require("express");
const app = express();

app.set('port', 3000);
const port = app.get('port');

app.use(express.json());

app.use('/productos', require('./src/rutas/productos.js'));
app.use('/pedidos', require('./src/rutas/pedidos.js'));
app.use('/usuarios', require('./src/rutas/usuarios.js'));
app.use('/favoritos', require('./src/rutas/favoritos.js'));
app.use('/estados', require('./src/rutas/estados.js'));
app.use('/formaPagos', require('./src/rutas/formaPagos.js'));
app.use('/login', require('./src/rutas/login.js'));

app.listen(port, () => {
    console.log("Server listening on port: ", port)
});