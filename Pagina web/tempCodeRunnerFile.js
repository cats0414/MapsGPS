server_express.get('/', function (req, res) {
	res.render('index', {
		ms: mensaje,
	});
});
