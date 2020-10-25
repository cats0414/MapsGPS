        let data;
		let fuent;
		let contador = 0;
		let camino2;
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
					if(json = {}){
						json = {lat: 10.29, lng:-74.65};
						console.log("Llego vacio");
						console.log(typeof(json));
					}
					var prue = JSON_QUERY(json,'$.lat');
					console.log(prue);
					let rutahist = Object.entries(json);
					console.log(rutahist);
					console.log((rutahist[0])[1]);
					console.log(typeof(rutahist));
					camino2 = (rutahist[0])[1];
					let centro = camino2[1];
					console.log(centro);
					map1.setCenter(centro);
					
					dibujarpoli2(camino2);
					map1.addListener("mousemove", consultahora);
			});
			function consultahora(event) {
				console.log(camino2);

				coordenadas = event.latLng;
				lat = coordenadas.lat();
				lng = coordenadas.lng();
				infoclick = {
					lat: lat,
					lng: lng
				}
				console.log(infoclick);
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