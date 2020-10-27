        let data;
		let fuent;
		let contador = 0;
		let camino2;
		let puntos = [];
		let tiempos = [] ;
		let valores = [];
		let tiempoConsul = [];
		let latit;
		let lngit;
		let latit2;
		let lngit2;
			const formLogin = document.querySelector('#formulario');
			
			
			formLogin.addEventListener('submit',event =>{
			// Mandar el formulario automaticamente.
			event.preventDefault();
			var datetimes= document.getElementById('datetimes').value;
			console.log(datetimes);

			var hora_inicial = document.getElementById('hora_inicial').value;
			console.log(hora_inicial);

			var hora_final = document.getElementById('hora_final').value;
			console.log(hora_final);
			var camion = document.getElementById("menu").value;
			console.log(camion);

			var minutoIni = document.getElementById("Minutos1").value;
			console.log(minutoIni);

			var minutoFin = document.getElementById("Minutos2").value;
			console.log(minutoFin);
			var id;
			if(camion == "3" || camion == "0"){
				 id = camion;
			}else{
				id = parseInt(camion);
			}
			
			var informacion = {
				datetimes: datetimes,
				hora_inicial: hora_inicial,
				hora_final: hora_final,
				camion:id,
				minuto_inicial: minutoIni,
				minuto_final: minutoFin
			}
			const options = {
			method: 'POST',
			body: JSON.stringify(informacion) ,
			headers:{
				'Content-Type': 'application/json'
      			// 'Content-Type': 'application/x-www-form-urlencoded',
			}
			
		};
		fetch('/resp',options).then((response) => response.json())
				.then((json) => {
					console.log(json);
					console.log(json.val);
					valores = json.val;
					console.log(json.val.length)
					for(var i = 0; i < json.val.length; ++i){
						puntos[i] = {lat: json.val[i].lat, lng: json.val[i].lng};
						tiempos[i] = {fecha: json.val[i].tiempo};
					}
					let centro = puntos[0];
					console.log(centro);
					map1.setCenter(centro);
					
					dibujarpoli2(puntos);
					map1.addListener("mousemove", consultahora);
			});
			function consultahora(event) {
				coordenadas = event.latLng;
				latit = parseFloat(coordenadas.lat()).toFixed(4);
				lngit = parseFloat(coordenadas.lng()).toFixed(4);
				latit2 = parseFloat(coordenadas.lat()+0.03).toFixed(4);
				lngit2 = parseFloat(coordenadas.lng()+0.03).toFixed(4);
				ValoresConsul = valores.filter(filtrarPorPosicion);				
				tiempoConsul = ValoresConsul.tiempo;
				console.log(tiempoConsul);

			}
			function filtrarPorPosicion(obj) {
				if (obj.lat >= latit && obj.lng >= lngit && obj.lat <= latit2 && obj.lng <= lngit2) {
				  return true;
				} else {
				  return false;
				}
			  }
			function dibujarpoli2(camino2){
				if(contador>0){
						linea2.setMap(null);
					}
				linea2 = new google.maps.Polyline({
				path: camino2, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight:2
}
);
				linea2.setMap(map1);
				contador = contador+1;
}
			});