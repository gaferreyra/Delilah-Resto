const Sequelize = require("sequelize");

const db = new Sequelize('delilahdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//corrobar que la conexion sea exitosa
db.authenticate()
    .then(() => console.log("La conexion fue exitosa"))
    .catch((error) => console.log("Ocurrio un error"));


module.exports = { db, Sequelize };