
let str2;
let palabra;
let mensajeC2;
let latitudC2;
let longitudC2;
var caminoCamion2 = [];
var cont2 = 0;
camion2Track();
async function camion2Track(){
    const respuesta = await fetch('/camion2');
    const datC2 = await respuesta.json();
    console.log(datC2.msg2);
    var str2 = '';
    if(datC2.msg2 == ""){
        setTimeout(camion2Track, 5000);
    }else{
        for (var i = 0; i < datC2.msg2.data.length; ++i) {
        str2 += String.fromCharCode(datC2.msg2.data[i]);
    }
}
        palabra = str2.split(',');
        console.log(palabra);
        latitudC2 = parseFloat(palabra[0]).toFixed(4);;
        longitudC2 = parseFloat(palabra[1]).toFixed(4);
        var coordeC2 = {lat: latitudC2, lng: longitudC2};
        if(cont2 >0){
            marcador2.setMap(null);
        }
        y = palabra[3];
        document.getElementById("y").innerHTML = y;
        actualPuntero2(latitudC2,longitudC2);
        setTimeout(camion2Track,5000);
}