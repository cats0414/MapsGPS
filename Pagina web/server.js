<<<<<<< HEAD
const express = require('express');
const app = express();
const mysql = require('mysql');

var mensaje = 'Hola';

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
=======
const express = require('express');
const app = express();
const mysql = require('mysql');


const dgram = require('dgram');
const server = dgram.createSocket('udp4');


// Creamos credenciales para ingresar a la base de datos
const database = mysql.createConnection({
		host: 'mysqldbinstance.cpscesy7fuy9.us-east-1.rds.amazonaws.com', user: 'admin' , password: '1234567890', database: 'mysqlinstance', port: 3306
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


app.set('view engine', 'ejs');
>>>>>>> origin/alfredodev



// Creamos credenciales para ingresar a la base de datos
const database = mysql.createConnection({
        host: 'db-cats.ckplc44wafdp.us-east-1.rds.amazonaws.com', user: 'admin' , password: '01201404', database: 'db-cats', port: 3306
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
});

<<<<<<< HEAD

app.set('view engine', 'ejs');


server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
=======
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
>>>>>>> origin/alfredodev
});


server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    mensaje = msg;
	msg = msg.toString().split(",")
	msg = {latitud: msg[0], longitud: msg[1], fecha:msg[2]}
	let sql = 'INSERT INTO datos SET ?';
	let query = database.query(sql, msg, (err, result) => {
	if (err) throw err;
});
});


server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});


server.bind(3659);


app.get('/', function (req, res) {
    res.render('index', {
        msg: mensaje,
    });
});


app.use(express.static('public'));


app.get('/ruta', function (req, res) {
    res.json({ msg: mensaje });
});


app.listen('40000', function () {
    console.log('Todo en orden');
});