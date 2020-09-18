import mysql from 'mysql';
const {promisify} = require('util');
const{ database } = require('/key.js');
const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if (err){
       if (err.code === 'PROTOCOL_CONNECTION_LOST'){
           console.error('CONEXION CON BASE DE DATOS PERDIDA');
       }
       if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('CONEXIONES OCUPADAS');
       }
    if (err.code === 'ECONNREFUSED'){
        console.error('CONEXION RECHAZADA');
    }
    }
    if (connection) connection.release();
    console.log('Base de datos conectada')
    return;
});
pool.query = promisify(pool.query);
module.exports = pool;