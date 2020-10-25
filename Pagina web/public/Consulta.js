        let data;
		let fuent;
		let contador = 0;
		let camino2;
		let puntos;
		let tiempos;
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
					console.log(json.val.length)
					for(var i = 0; i < json.val.length; ++i){
						puntos[i] = {lat: json.val[i].lat, lng: json.val[i].lng};
						tiempo[i] = {fecha: json.val[i].tiempo};
					}
					console.log(puntos);
					console.log(tiempo);
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
					lng: lng,
					}
				console.log(infoclick);
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
					console.log(json.time);
					datostem = JSON.stringify(json.time.tiempo);
					/*pruebas = datostem.replace("[{tiempo:"," ");
					casifi = replaceAll(pruebas,'},{tiempo:','---');
					function replaceAll(str, find, replace) {
					return str.replace(new RegExp(find, 'g'), replace);
					};
					mensa = casifi.split('---');
					console.log(mensa);

					comp = "El camion paso por el punto el los siguientes instantes: \n";
					pale = datostem;
					mens = comp.concat("\n",mensa);
					console.log(mens);*/
				});

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