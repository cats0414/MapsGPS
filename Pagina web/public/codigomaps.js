

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
		datostem = JSON.stringify(json);

		console.log(datostem);
		comp = "El camion paso por el punto el los siguientes instantes:";
		
		mens = comp.concat(" ",datostem);
		console.log(mens);
		const inf = '<div id="content">' +
		'<div id="siteNotice">' +
		"</div>" +
		'<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
		'<div id="bodyContent">' +
		"<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
		"sandstone rock formation in the southern part of the " +
		"Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
		"south west of the nearest large town, Alice Springs; 450&#160;km " +
		"(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
		"features of the Uluru - Kata Tjuta National Park. Uluru is " +
		"sacred to the Pitjantjatjara and Yankunytjatjara, the " +
		"Aboriginal people of the area. It has many springs, waterholes, " +
		"rock caves and ancient paintings. Uluru is listed as a World " +
		"Heritage Site.</p>" +
		'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
		"https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
		"(last visited June 22, 2009).</p>" +
		"</div>" +
		"</div>";
		console.log(mens);
		
		infowindow = new google.maps.InfoWindow({
			content: inf,
		});
					marca = new google.maps.Marker({
						position: event.latLng,
						map: map1,
					  });
					infowindow.open(map1, marca);
				});
	
}	
