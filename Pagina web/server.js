const express = require('express');
const app = express();
const mysql = require('mysql');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
<<<<<<< HEAD
=======
const path = require('path');
var mensaje = 'Hola';
var rut = 'Loquesea';
var valores = [];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var datapri = [];
var cons = require('consolidate');
app.set('views', path.join(__dirname, 'views'));
app.set('imagenes', path.join(__dirname, '/public/imagenes'));
app.set('calendar', path.join(__dirname, '/public/calendar'));
>>>>>>> 506b79d00b34d2470d13d4192d696d72ad5c0a8f
require('dotenv').config();
// Creamos credenciales para ingresar a la base de datos
const database = mysql.createConnection({
		host: process.env.db_host, user: process.env.db_user , password: process.env.db_pass, database: process.env.db_data, port: process.env.db_port
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

app.engine('html',cons.swig)
app.set('view engine', 'html');

server.on('error', (err) => {
	console.log(`server error:\n${err.stack}`);
	server.close();
});

server.on('message', (msg, rinfo) => {
    // console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    mensaje = msg;
    msg = msg.toString().split(",")
    lati = parseFloat(msg[0]).toFixed(4);
    longi = parseFloat(msg[1]).toFixed(4);
    msg = {id : "1" ,lat: lati, lng: longi, tiempo: msg[2]}
    msg2 = {id: "1" ,lat: msg[0], lng: msg[1],tiempo: msg[2]} 
    let sql = 'INSERT INTO usuarios2 SET ?';
    let query = database.query(sql, msg, (err, result) => {
    if (err){
	console.trace('error=' + err.message);
};
});
});

server.on('listening', () => {
	const address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(3659);

app.get('/', function (req, res) {
	res.render('index', {
		msg: mensaje,
	});
});
app.post('/resp', urlencodedParser, function (req,res) {
		// esto recibe la información. 
        console.log(req.body);
        data1 = req.body;
        dat = data1.datetimes;
		hora1 = data1.hora_inicial;
		hora2 = data1.hora_final;
		datapri = dat.toString().split(" - ");
		da1 = datapri[0].concat(" " ,hora1);
		da2 = datapri[1].concat( " " ,hora2);
		console.log(da1);
		console.log(da2);
        let sql2 = 'SELECT lat, lng FROM usuarios2 WHERE (tiempo > ? AND tiempo < ?)';
        let query2 = database.query(sql2,[da1,da2],(err, result) => {
        if(err){
        console.trace('error = ' +err.message);
        };
        valores = result;
	res.render('index',{msg: mensaje, valores});
});
});
app.use(express.static(__dirname + '/public'));



app.get('/ruta', function (req, res) {
	res.json({ msg: mensaje });
});

app.get('/resp', function (req,res){
	res.json({valores});
});

app.listen('40000', function () {
	console.log('Todo en orden');
});
