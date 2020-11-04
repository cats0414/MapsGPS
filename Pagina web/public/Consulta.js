        let data;
		let fuent;
		let contador = 0;
		let contador2 = 0;
		let camino2;
		let puntos = [];
		let puntos2 = [];
		let tiempos = [] ;
		let valores = [];
		let tiempoConsul = [];
		let latit;
		let lngit;
		let latit2;
		let lngit2;
		let contadorGeneral = 0;
		let linea2 = [];
		let linea3 = [];
		const Radio = 6371; //Radio de la tierra
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
					console.log(json.val.length);

					// Identifiquemos primero si llego un array vacio:
					if(json.val.length == 0){
						console.log("No llegaron datos del servidor, no se tienen datos del periodo");
						alert("No se tienen datos del periodo ingresado, favor ingresar nuevo periodo.");
					}else{
					// Si estamos en esta parte, significa que llegaron datos del servidor
					// aplicamos un filtro dependiendo del id.
					ValoresId1= json.val.filter(filtrarPorId1);
					console.log(ValoresId1);
					ValoresId2 = json.val.filter(filtrarPorId2);
					console.log(ValoresId2);
					if(contadorGeneral >0){
						if(contador>0){
							linea2.setMap(null);
						}
						if(contador2 >0){
							linea3.setMap(null);
						}
					}
					
					// Verificamos ahora si alguno de los dos nuevos arrays estan vacios.
					if(ValoresId1.length == 0){
						console.log("No hay datos del primer camion");
					}else{
						console.log("LLegaron datos del primer camion");
						for(var i = 0; i < ValoresId1.length; ++i){
							puntos[i] = {lat: ValoresId1[i].lat, lng: ValoresId1[i].lng};
						}
						let centro = puntos[0];
						console.log(centro);
						map1.setCenter(centro);
						dibujarpoli2(puntos);
					}
					if(ValoresId2.length == 0){
						console.log("No hay datos del segundo camion");
					}else{
						console.log("Llegaron datos del segundo camion");
						for(var i = 0; i < ValoresId2.length; ++i){
							puntos2[i] = {lat: ValoresId2[i].lat, lng: ValoresId2[i].lng};
						}
						map1.setCenter(puntos2[0]);
						dibujarpolicamion2(puntos2);
					}
					
					
					map1.addListener("mousemove", consultahora);
				}
			});
			function consultahora(event) {
				coordenadas = event.latLng;
				latpri = coordenadas.lat();
				lngpri = coordenadas.lng();	
				latit2 = parseFloat(coordenadas.lat()) + rad2deg(0.005/Radio);
				
				lngit2 = parseFloat(coordenadas.lng()) + (rad2deg(Math.asin(0.005/Radio)))/(Math.cos(deg2rad(coordenadas.lat())));
				
				latit = parseFloat(coordenadas.lat()) - rad2deg(0.005/Radio);
				
				lngit = parseFloat(coordenadas.lng()) - (rad2deg(Math.asin(0.005/Radio)))/(Math.cos(deg2rad(coordenadas.lat())));
				
				ValoresConsul = valores.filter(filtrarPorPosicion);
				if(ValoresConsul.length == 0){
					document.getElementById("resultiempo").innerHTML = "<p> No hay valores para este periodo de tiempo </p>"
				}else{	
				for(var i = 0; i < ValoresConsul.length; ++i){
					tiempoConsul[i] = ValoresConsul[i].tiempo;
				}
				let tiemposreales = [... new Set(tiempoConsul)];
				let TiemposMostrados = tiemposreales.join(" // ");			
				document.getElementById("resultiempo").innerHTML = TiemposMostrados;
			}
			}
			function filtrarPorPosicion(obj) {
				tolerancia = 0.005;
				//distanciaMaxi = Math.acos(Math.sin(latpri)*)
				if (obj.lat >= latit && obj.lng >= lngit && obj.lat <= latit2 && obj.lng <= lngit2) {
					pruebs = Math.acos(Math.sin(deg2rad((latit+latit2)/2))*Math.sin(deg2rad(obj.lat))+Math.cos(deg2rad((latit+latit2)/2))*Math.cos(deg2rad(obj.lat))*Math.cos(deg2rad(obj.lng)-deg2rad((lngit+lngit2)/2)));
					
				  if(pruebs<tolerancia){
					return true;
				  }else{
					  return false;
				  }
				} else {
				  return false;
				}
			  }
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
			function rad2deg(radians){
				var pi = Math.PI;
				return radians*(180/pi);
			}
			function deg2rad(angulo){
				var pi = Math.PI;
				return angulo*(pi/180);
			}
			function dibujarpoli2(camino2){
				
				linea2 = new google.maps.Polyline({
				path: camino2, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight:2
}
);
				linea2.setMap(map1);
				++contador;
				++contadorGeneral;
}
			});
			function dibujarpolicamion2(puntos2){
				linea3 = new google.maps.Polyline({
					path: puntos2, strokeColor: '#0000FF', strokeOpacity: 1.0, strokeWeight:2
				});
				linea3.setMap(map1);
				++contador2;
				++contadorGeneral;
			};