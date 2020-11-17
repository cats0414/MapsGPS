let centro;

function CentradoPrimerCamion(){
    console.log(data.msg);
if(data.msg == " "){
    console.log("No hay datos almacenados en memoria");
    alert("No hay datos para centrar. ");
}else{
    console.log("Hay datos para centrar");
    // Realizamos el centrado cada vez que llegue un nuevo valor
    map.setCenter(coorde);
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
    }

}
function Centradodesabilitado(){
    map.setCenter(null);
}