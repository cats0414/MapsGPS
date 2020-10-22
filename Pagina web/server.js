const express = require('express');
const app = express();
const mysql = require('mysql');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const path = require('path');
var mensaje = '';
var rut = 'Loquesea';
var valores = [];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var datapri = [];
var cons = require('consolidate');
app.set('views', path.join(__dirname, 'views'));
app.set('imagenes', path.join(__dirname, '/public/imagenes'));
app.set('calendar', path.join(__dirname, '/public/calendar'));
app.use(express.json({limit:'1mb'}));
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
    //console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    mensaje = msg;
    msg = msg.toString().split(",")
    lati = parseFloat(msg[0]).toFixed(4);
	longi = parseFloat(msg[1]).toFixed(4);
	ID = parseInt(msg[3]);
	fecha = new Date(msg[2]);
	console.log(typeof(fecha));
	console.log(fecha);
    msg = {id : ID ,lat: lati, lng: longi, tiempo: fecha}
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
app.post('/resp',function (req,res) {
		// esto recibe la información. 
		console.log("LLego informacion del cliente");
        console.log(req.body);
        data1 = req.body;
        dat = data1.datetimes;
		hora1 = data1.hora_inicial;
		hora2 = data1.hora_final;
		minutoIni = data1.minuto_inicial;
		console.log(minutoIni);
		minutoFin = data1.minuto_final;
		console.log(minutoFin);
		camion = parseInt(data1.camion);
		console.log(camion);
		console.log(typeof(camion));
		datapri = dat.toString().split(" - ");
		da1 = datapri[0].concat(" " ,hora1,":",minutoIni);
		da2 = datapri[1].concat( " " ,hora2,":",minutoFin);
		console.log(da1);
		console.log(da2);
		var tiempoconsulta1 = new Date(da1);
		var tiempoconsulta2 = new Date(da2); 
		console.log(da1);
		console.log(da2);
		console.log(tiempoconsulta1);
		console.log(tiempoconsulta2);
		if (camion == 3 || camion == 0){
        let sql2 = 'SELECT lat, lng FROM usuarios2 WHERE tiempo BETWEEN ? AND ?';
        let query2 = database.query(sql2,[tiempoconsulta1,tiempoconsulta2],(err, result) => {
        if(err){
        console.trace('error = ' +err.message);
        };
        valores = result;
	res.json({val: valores});
});
		}else{
			let sql2 = 'SELECT lat, lng FROM usuarios2 WHERE (tiempo BETWEEN ? AND ?) AND (id = ?)';
			let query2 = database.query(sql2,[tiempoconsulta1,tiempoconsulta2,camion],(err, result) => {
				if(err){
				console.trace('error = ' +err.message);
				};
				valores = result;
			res.json({val: valores});
		});
		}
});
app.post('/hora',function (req,res) {
	console.log("Llego informacion para hacer consulta de hora en determinado lugar");
	console.log(req.body);
	lati = parseFloat(req.body.lat+0.06).toFixed(3);
	console.log(lati);
	long = parseFloat(req.body.lng+0.06).toFixed(3);
	console.log(long);
	lati2 = parseFloat(req.body.lat).toFixed(3);
	console.log(lati2);
	
	long2 = parseFloat(req.body.lng).toFixed(3);
	console.log(long2);
	let sql3 = "SELECT tiempo FROM usuarios2 WHERE (lat <= ?) AND (lng <= ?) AND (lat >= ?) AND (lng >= ?)";
	let query3 = database.query(sql3,[lati,long,lati2,long2],(err,result) =>{
		if(err){
			console.trace('error = ' +err.message);
			};
		fechas = result;
		console.log(fechas);
		res.json({time:fechas});
	});
	
});
app.use(express.static(__dirname + '/public'));



app.get('/ruta', function (req, res) {
	res.json({ msg: mensaje });
});



app.listen('40000', function () {
	console.log('Todo en orden');
});
