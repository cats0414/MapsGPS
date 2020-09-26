let map;
<<<<<<< .merge_file_Q7G4hA
var coordi;
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
<<<<<<< HEAD
			setTimeout(update, 1000);
=======
			setTimeout(update, 4000);
<<<<<<< HEAD
>>>>>>> origin/alfredodev
=======
>>>>>>> alfredodev
>>>>>>> 9d1b8a211999e297efb14c22f14cbe6f270a515b
			return coordi;
		});
}
update();
=======
var coordi={lat:11.003  , lng:-74.82 };
var lta
var lng


>>>>>>> .merge_file_7m8F8z
function initMap(){
	map = new google.maps.Map(document.getElementById('map'),{
	zoom: 10,
	center: {lat:11.003  , lng:-74.82 }
	});
<<<<<<< .merge_file_Q7G4hA
	function actMarc(){
	marcador = new google.maps.Marker({
<<<<<<< HEAD
<<<<<<< HEAD
=======
		position: coordi ,
		map: map
	});
<<<<<<< HEAD
=======
>>>>>>> 9d1b8a211999e297efb14c22f14cbe6f270a515b
				position: coordi ,
				map: map
			});
>>>>>>> 28027d24434434ced13574b9a5965cb50c1e7cc4
	setTimeout(actMarc, 1000);
<<<<<<< HEAD
	}
	actMarc();
}
=======
		position: coordi ,
		map: map
	});
=======
=======
>>>>>>> 9d1b8a211999e297efb14c22f14cbe6f270a515b
	setTimeout(actMarc, 5000);
>>>>>>> alfredodev
	}
	actMarc();
<<<<<<< HEAD
}
>>>>>>> origin/alfredodev
=======
}
>>>>>>> 9d1b8a211999e297efb14c22f14cbe6f270a515b
=======
	
}	
>>>>>>> .merge_file_7m8F8z
