const express = require('express');
const app = express();

var mensaje = 'Hola';
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

app.set('view engine', 'ejs');

server.on('error', (err) => {
	console.log(`server error:\n${err.stack}`);
	server.close();
});

server.on('message', (msg, rinfo) => {
	console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
	mensaje = msg;
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

app.use(express.static('public'));

app.get('/ruta', function (req, res) {
	res.json({ msg: mensaje });
});

app.listen('40000', function () {
	console.log('Todo en orden');
});
