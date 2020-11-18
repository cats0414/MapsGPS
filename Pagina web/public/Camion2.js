let datC2 = []
let str2;
let palabra;
let mensajeC2;
let latitudC2;
let longitudC2;
var caminoCamion2 = [];
var cont2 = 0;
let coorC2;
camion2Track();
async function camion2Track(){
    const respuesta = await fetch('/camion2');
    datC2 = await respuesta.json();
    console.log(datC2.msg2);
    var str2 = '';
    if(datC2.msg2 == ' '){
        setTimeout(camion2Track, 5000);
    }else{
        palabra = datC2.msg2;
        console.log(palabra);
        latitudC2 = parseFloat(palabra[0]).toFixed(4);
        longitudC2 = parseFloat(palabra[1]).toFixed(4);
        coorC2 = new google.maps.LatLng(latitudC2,longitudC2); 
        //var coordeC2 = {lat: latitudC2, lng: longitudC2};
        if(cont2 >0){
            marcadorCamion2.setMap(null);
        }

        porcentajetemp2 = datos[3];
        porcentajetemp2 = palabra[3];
			if(porcentajetemp2 > 100){
					y = 0;
			}else{
				y = 100-palabra[3];
			}
        y = palabra[3];
        document.getElementById("y").innerHTML = y;
        let vic=y;
		document.getElementById("ca2").style.setProperty('--liquid', '--liquid: '+vic);
        actualPuntero2(latitudC2,longitudC2);
        setTimeout(camion2Track,5000);
    }
    function actualPuntero2(latit,longi){
        var coorden2 = new google.maps.LatLng(latit,longi);
        //map.setCenter(coorden2);
        marcadorCamion2 = new google.maps.Marker({
            position: coorden2 ,
            icon: {
                  url: "/images/Camion2.png"
            },
            map: map
        });
        
        caminoCamion2[cont2] = coorden2;
        cont2 = cont2+1;
        dibujarpoliCamion2(caminoCamion2); 
        marcadorCamion2.setMap(map);
        
        
    }
    function dibujarpoliCamion2(caminoCamion2){
        var lineaCamion2 = new google.maps.Polyline({
        path: caminoCamion2,
        strokeColor: '#0000FF',
        strokeOpacity:1.0,
        strokeWeight: 2
        });

        lineaCamion2.setMap(map);
        addLatLng(caminoCamion2);
        }
        function addLatLng(caminoP){
            const path = caminoP;
            path.push;
        }
}