const express = require('express');
const app = express();
const mysql = require('mysql');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const path = require('path');
var x,y,z;
var mensaje = ' ';
var mensajeC2 = ' ';
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
    console.log(`server got: ${msg}`);
    //mensaje = msg;
	msg = msg.toString().split(",");
	
    lati = parseFloat(msg[0]).toFixed(4);
	longi = parseFloat(msg[1]).toFixed(4);
	ID = parseInt(msg[4]);
	console.log(ID);
	fecha = new Date(msg[2]);
	if(ID == 1){
		mensaje = msg;
		console.log("Camion1");
		console.log(mensaje);
	}else{
		mensajeC2 = msg;
		console.log("Camion2");
		console.log(mensajeC2);
	}
	// Hay que verificar que el mensaje ha cambiado.

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
        data1 = req.body;
        dat = data1.datetimes;
		hora1 = data1.hora_inicial;
		hora2 = data1.hora_final;
		minutoIni = data1.minuto_inicial;
		minutoFin = data1.minuto_final;
		camion = parseInt(data1.camion);
		console.log(camion);
		console.log(typeof(camion));
		datapri = dat.toString().split(" - ");
		da1 = datapri[0].concat(" " ,hora1,":",minutoIni);
		da2 = datapri[1].concat( " " ,hora2,":",minutoFin);
		var tiempoconsulta1 = new Date(da1);
		var tiempoconsulta2 = new Date(da2); 
		console.log(tiempoconsulta1);
		console.log(tiempoconsulta2);
		if (camion == 3 || camion == 0){
        let sql2 = 'SELECT * FROM usuarios2 WHERE (tiempo BETWEEN ? AND ?) AND (id = 1 OR id = 2) ';
        let query2 = database.query(sql2,[tiempoconsulta1,tiempoconsulta2],(err, result) => {
        if(err){
        console.trace('error = ' +err.message);
        };
		valores = result;
		// Podria realizar un filtro en esta parte
		valoresCamion1 = valores.filter(filtrarPorId1);
		valoresCamion2 = valores.filter(filtrarPorId2);
	res.json({val: valores, iden: 3, valC1 : valoresCamion1, valC2 : valoresCamion2});
});
		}else{
			let sql2 = 'SELECT * FROM usuarios2 WHERE (tiempo BETWEEN ? AND ?) AND (id = ?)';
			let query2 = database.query(sql2,[tiempoconsulta1,tiempoconsulta2,camion],(err, result) => {
				if(err){
				console.trace('error = ' +err.message);
				};
				valores = result;
			res.json({val: valores, iden:camion});
		});
		}
});
function filtrarPorId1(obj){
	if(obj.id == 1){
		return true;
	}else{
		return false;
	}
}
function filtrarPorId2(obj){
	if(obj.id == 2){
		return true;
	}else{
		return false;
	}
}


app.use(express.static(__dirname + '/public'));



app.get('/ruta', function (req, res) {
	res.json({ msg: mensaje });
});

app.get('/camion2', function (req,res){
	res.json({ msg2: mensajeC2});
});



app.listen('40000', function () {
	console.log('Todo en orden');
});
