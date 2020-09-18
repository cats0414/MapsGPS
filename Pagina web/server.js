const express = require('express');
const app = express();
var mensaje= 'hola';
const mysql = require('mysql');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
require('dotenv').config()
// Creamos credenciales para ingresar a la base de datos
const database = mysql.createConnection({
		host: process.env.db_host, user: process.env.db_user , password: process.env.db_pass, database: process.env.db_data , port: process.env.db_port
});
// conectamos con la base de datos
database.connect((err,connection) =>{
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
	
	 console.log('Base de datos conectada')
});


<<<<<<< HEAD

app.set('view engine', 'ejs');
<<<<<<< HEAD
>>>>>>> origin/alfredodev
=======
>>>>>>> alfredodev
=======
var mensaje = 'Hola';
>>>>>>> 28027d24434434ced13574b9a5965cb50c1e7cc4

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
>>>>>>> 9d1b8a211999e297efb14c22f14cbe6f270a515b

=======
>>>>>>> 9a8688e5059ffcfa072714b9dad903308b93ab3b

app.set('view engine', 'ejs');

<<<<<<< HEAD
<<<<<<< HEAD
// Creamos credenciales para ingresar a la base de datos
const database = mysql.createConnection({
        host: 'db-cats.ckplc44wafdp.us-east-1.rds.amazonaws.com', user: 'admin' , password: '01201404', database: 'db-cats', port: 3306
=======
server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
>>>>>>> cats
});
// conectamos con la base de datos
database.connect((err) =>{
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('CONEXION CON BASE DE DATOS PERDIDA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
             console.error('CONEXIONES OCUPADAS');
        }
     if (err.code === 'ECONNREFUSED'){
         console.error('CONEXION RECHAZADA');
     }
     }
     if (connection) connection.release();
     console.log('Base de datos conectada')
=======
server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
>>>>>>> 9a8688e5059ffcfa072714b9dad903308b93ab3b
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    mensaje = msg;
    msg = msg.toString().split(",")
    msg = {id : "1" ,latitud: msg[0], longitud: msg[1], tiempo: msg[2]}
    let sql = 'INSERT INTO usuarios SET ?';
    let query = database.query(sql, msg, (err, result) => {
    if (err){
        console.trace('error=' + err.message);
};
});
});

<<<<<<< HEAD

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    mensaje = msg;
<<<<<<< HEAD
	msg = msg.toString().split(",")
	msg = {latitud: msg[0], longitud: msg[1], fecha:msg[2]}
	let sql = 'INSERT INTO datos SET ?';
	let query = database.query(sql, msg, (err, result) => {
	if (err) throw err;
});
=======
>>>>>>> 9d1b8a211999e297efb14c22f14cbe6f270a515b
});

<<<<<<< HEAD

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
=======
server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
>>>>>>> cats
=======
server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
>>>>>>> 9a8688e5059ffcfa072714b9dad903308b93ab3b
});

server.bind(3659);

<<<<<<< HEAD
<<<<<<< HEAD

app.get('/', function (req, res) {
    res.render('index', {
        msg: mensaje,
    });
=======
=======
>>>>>>> 9a8688e5059ffcfa072714b9dad903308b93ab3b
app.get('/', function (req, res) {
        res.render('index', {
                msg: mensaje,
        });
<<<<<<< HEAD
>>>>>>> cats
=======
>>>>>>> 9a8688e5059ffcfa072714b9dad903308b93ab3b
});

app.use(express.static('public'));

<<<<<<< HEAD
<<<<<<< HEAD

app.get('/ruta', function (req, res) {
    res.json({ msg: mensaje });
=======
app.get('/ruta', function (req, res) {
        res.json({ msg: mensaje });
});

app.listen('40000', function () {
        console.log('Todo en orden');
>>>>>>> cats
=======
app.get('/ruta', function (req, res) {
        res.json({ msg: mensaje });
>>>>>>> 9a8688e5059ffcfa072714b9dad903308b93ab3b
});

app.listen('40000', function () {
        console.log('Todo en orden');
});
