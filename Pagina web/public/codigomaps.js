const { timeout } = require("async");

let map;
var coordi={lat:11.003  , lng:-74.82 };
var lta
var lng


function initMap(){
	map = new google.maps.Map(document.getElementById('map'),{
	zoom: 15,
	center: {lat:11.003  , lng:-74.82 }
	});
	map1 = new google.maps.Map(document.getElementById('map2'),{
        zoom: 15,
        center: {lat:11.003  , lng:-74.82 }
        });
	map1.addListener("click", consultahora);
	
}
function consultahora(event) {
	coordenadas = event.latLng;
	lat = coordenadas.lat();
	lng = coordenadas.lng();
	console.log(lat);
	console.log(lng);
	infoclick = {
		lat: lat,
		lng: lng
	}
	const options2 = {
		method: 'POST',
		body: JSON.stringify(infoclick) ,
		headers:{
			'Content-Type': 'application/json'
			  // 'Content-Type': 'application/x-www-form-urlencoded',
		}
	};
	fetch('/hora',options2).then((response) => response.json())
				.then((json) => {
					console.log(json);
					datostem = Object.entries(json);
					condi = (datostem[0])[1];
					if(condi = null){
						comp = "El camion no ha pasado por este punto.";
						tiemp = "";
					}else{
						tiemp = toString((datostem[0])[1]);
						comp = "El camion paso por el punto el los siguientes instantes:";
					};
					mens = comp.concat(" ",tiemp);
					console.log(mens);
					
					infowindow = new google.maps.InfoWindow({
						content: mens,
					});
					marca = new google.maps.Marker({
						position: event.latLng,
						map: map1,
					  });
					infowindow.open(map1, marca);
				});
	
}	
