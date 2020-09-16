let map;
var coordi={lat:11.003  , lng:-74.82 };
function update() {
	fetch('/ruta')
		.then((response) => response.json())
		.then((json) => {
			console.log(json);
			var str = '';
			for (var i = 0; i < json.msg.data.length; ++i) {
				str += String.fromCharCode(json.msg.data[i]);
			}

			datos = str.split(',');
			latitud = Number.parseFloat(datos[0]);
			longitud = Number.parseFloat(datos[1]);
			fecha = datos[2];
			var lta = latitud;
			var	lng = longitud;
			if (isNaN(lta)||isNaN(lng)){
				ltan=11.003;
				lonn=-74.82;
			}else{
				ltan=lta;
				lonn=lng;
			}
			coordi = {lat:ltan,lng:lonn}
			setTimeout(update, 4000);
			return coordi;
		});
}
update();
function initMap(){
	map = new google.maps.Map(document.getElementById('map'),{
	zoom: 10,
	center: {lat:11.003  , lng:-74.82 }
	});
	function actMarc(){
	marcador = new google.maps.Marker({
		position: coordi ,
		map: map
	});
	setTimeout(actMarc, 1000);
	}
	actMarc();
}
