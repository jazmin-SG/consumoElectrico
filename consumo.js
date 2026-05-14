let sumaGlobal = 0;
let mayorConsumo = 0;
let nombre = "";
    let watts = 0;
    let standby = 0;

    function actualizarDatos() {
    let opcion = document.getElementById("opcionProducto").value;

    if( opcion=="televisor"){
        document.getElementById("watts").value = 100;
        document.getElementById("standby").value = 2.5;
        document.getElementById("otroProducto").style.display = "none";
    }
    else if (opcion === "refrigeradora") {
        document.getElementById("watts").value = 350;
        document.getElementById("standby").value = 0;
        document.getElementById("otroProducto").style.display = "none";
    }
    else if (opcion === "laptop") {
        document.getElementById("watts").value = 50;
        document.getElementById("standby").value = 1.5;
        document.getElementById("otroProducto").style.display = "none";
    }  
        else if (opcion === "lavadora") {
        document.getElementById("watts").value = 2000;
        document.getElementById("standby").value = 3.0;
        document.getElementById("otroProducto").style.display = "none";
    }
        else if (opcion === "microondas") {
        document.getElementById("watts").value = 1200;
        document.getElementById("standby").value = 0.5;
        document.getElementById("otroProducto").style.display = "none"; 
    }
    else if (opcion === "otro") {
        document.getElementById("otroProducto").style.display = "block";
        document.getElementById("watts").value = "";
        document.getElementById("standby").value = "";
    
    }
    else {
        document.getElementById("otroProducto").style.display = "none";
        document.getElementById("watts").value = "";
        document.getElementById("standby").value = ""; 
    }
}
function agregarProducto() {
    let consumoFantasma = 0;
    let opcion = document.getElementById("opcionProducto").value;
    
    let watts = Number(document.getElementById("watts").value);
    let standby = Number(document.getElementById("standby").value);
    let horas = Number(document.getElementById("horasUso").value);

    //ALERTA SI NO SE LLENAN LOS ESPACIOS DEL FORMULARIO
    if (opcion === "" || watts === "" || standby === "" || horas === "") {
        alert("¡Atención! Debe llenar todos los campos antes de enviar el formulario.");
        return;
    }

    let conectado = document.getElementById("estaConectado").value; 
    let nombre = "";
     if (opcion === "otro") {
        nombre = document.getElementById("nombreProducto").value;
     }
     else  {
        nombre=opcion;
     }
    if (isNaN(watts)||horas>24||horas<0 || isNaN(standby) || isNaN(horas)) {
        alert("Por favor, ingrese valores válidos para watts, horas y standby.");
        return;
    }
    if (conectado === "si") {
        consumoFantasma = (standby * (24 - horas)) / 1000;
    }


    let consumoActivo = (watts * horas) / 1000;
   
    let totalProducto = consumoActivo + consumoFantasma;

    sumaGlobal = sumaGlobal + totalProducto;
     document.getElementById("resultadoDetalle").innerHTML +=  nombre + ": " + consumoActivo.toFixed(2) + " kWh<br>";

    document.getElementById("resultadoTotal").innerHTML = 
        "Consumo standby de los productos que no se apagan: " +consumoFantasma.toFixed(2) + " kWh<br>" 

//TABLA DE LOS PRODUCTOS
    let tabla = document.getElementById("tablaProductos");
    let nuevaFila = tabla.insertRow();
    nuevaFila.insertCell(0).innerHTML = nombre;
    nuevaFila.insertCell(1).innerHTML = watts + " W";
    nuevaFila.insertCell(2).innerHTML = horas + " h";
    nuevaFila.insertCell(3).innerHTML = "<strong>" + totalProducto.toFixed(2) + " kWh</strong>";
}
   

