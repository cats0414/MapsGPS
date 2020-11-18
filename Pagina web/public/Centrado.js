let centro;
let controlador1 = false;
let controlador2 = false;
function CentradoPrimerCamion(){
    console.log(data.msg);
if(data.msg == " "){
    console.log("No hay datos almacenados en memoria");
    alert("No hay datos para centrar. ");
}else{
    console.log("Hay datos para centrar");
    // Realizamos el centrado cada vez que llegue un nuevo valor
    map.setCenter(coor);
    controlador1 = true;
    controlador2 = false;
}
}

function CentradoSegundoCamion(){
    console.log(datC2.msg2);
    if(datC2.msg2 == " "){
        console.log("No hay datos del segundo camion para centrar");
        alert("No hay datos para centrar. ");
    }else{
        console.log("Hay datos para centrar");
        map.setCenter(coorC2);
        controlador2 = true;
        controlador1 = false;
    }

}
function Centradodesabilitado(){
    map.setCenter(null);
}