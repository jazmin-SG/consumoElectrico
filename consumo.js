let sumaGlobal = 0;
let mayorConsumo = 0;
let nombre = "";
let watts = 0;
let standby = 0;

function actualizarDatos() {
    let opcion = document.getElementById("opcionProducto").value;

    if (opcion == "televisor") {
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
    if (horas == "") {
        alert("Debe ingresar las horas de uso del producto");
        return;
    }
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
    else {
        nombre = opcion;
    }
    if (isNaN(watts) || horas > 24 || horas < 0 || isNaN(standby) || isNaN(horas)) {
        alert("Por favor, ingrese valores válidos para watts, horas y standby.");
        return;
    }
    if (conectado === "si") {
        consumoFantasma = (standby * (24 - horas)) / 1000;
    }


    let consumoActivo = (watts * horas) / 1000;

    let totalProducto = consumoActivo + consumoFantasma;

    sumaGlobal = sumaGlobal + totalProducto;

    //TABLA DE LOS PRODUCTOS
    let tabla = document.getElementById("tablaPrincipal");
    let nuevaFila = tabla.insertRow();
    // importante para almacenar los tados  
    nuevaFila.setAttribute("data-fantasma", consumoFantasma);
    nuevaFila.setAttribute("data-consumo", totalProducto.toFixed(4));
    nuevaFila.setAttribute("data-activo", consumoActivo.toFixed(4));
nuevaFila.setAttribute("data-conectado", conectado);
nuevaFila.setAttribute("data-watts", watts);              
nuevaFila.setAttribute("data-standby", standby);         
nuevaFila.setAttribute("data-horas", horas); 

    nuevaFila.insertCell(0).innerHTML = nombre;
    nuevaFila.insertCell(1).innerHTML = watts + " W";
    nuevaFila.insertCell(2).innerHTML = standby + " W";
    nuevaFila.insertCell(3).innerHTML = horas + " h";
    // Agregamos una quinta celda para el total calculado
    nuevaFila.insertCell(4).innerHTML = "<strong>" + totalProducto.toFixed(2) + " kWh</strong>";
    // celda para el botón de eliminar
    let celdaAccion = nuevaFila.insertCell(5);
    celdaAccion.innerHTML = '<button onclick="eliminarFila(this)" style="background-color: #b0d3d3; color: black; border: none; cursor: pointer; padding: 5px 10px;">Quitar</button>';
    nuevaFila.setAttribute("data-consumo", totalProducto.toFixed(2));
    document.getElementById("horasUso").value = "";

}

//NUEVA FUNCION PARA ELIMINAR LA FILA DE LA TABLA
function eliminarFila(boton) {
    let fila = boton.parentNode.parentNode;
    let valor = Number(fila.getAttribute("data-consumo"));
    sumaGlobal = sumaGlobal - valor;
    fila.parentNode.removeChild(fila);
    // Actualizar el resumen después de eliminar un producto
    let filasRestantes = document.getElementById("tablaPrincipal").rows.length;
    if (filasRestantes == 0) {
        document.getElementById("cajaaResumen").style.display = "none";
        document.getElementById("cajaFantasma").style.display = "";
    }
    else {
        mostrarResumen();
    }
    // si no hay producto ocultar//
    if (document.getElementById("tablaprincipal").rows.length == 0) {
        document.getElementById("cajaResumen").style.display = "none";
    }
}
// RESUMEN DE LOS PRODUCTOS AGREGADOS
function mostrarResumen() {
    let tabla = document.getElementById("tablaPrincipal");
    let filas = tabla.rows;

    if (filas.length == 0) {
        alert("No hay productos agregados.");
        return;
    }
    let mayorNombre = "";
    let mayorTotal = 0;
    let sumaFantasmaTotal = 0;
    let sumaActivoTotal = 0;
    let resultado = "";
    // uso la tabla que se creo arriba para recorrer cada fila 
    for (let i = 0; i < filas.length; i++) {
        let nombreFila = filas[i].cells[0].innerText;
        let totalFila = Number(filas[i].getAttribute("data-consumo"));
        let fantasmaFila = Number(filas[i].getAttribute("data-fantasma"));
        let activoFila = Number(filas[i].getAttribute("data-activo"));
        let conectado = filas[i].getAttribute("data-conectado");
        let watts = Number(filas[i].getAttribute("data-watts"));
        let standby = Number(filas[i].getAttribute("data-standby"));
        let horas = Number(filas[i].getAttribute("data-horas"));

        sumaActivoTotal = sumaActivoTotal + activoFila;
        sumaFantasmaTotal = sumaFantasmaTotal + fantasmaFila;

        if (totalFila > mayorTotal) {
            mayorTotal = totalFila;
            mayorNombre = nombreFila;
        }
 // use el resultado para acomular la informacion de cada producto//
      resultado = resultado + "Producto: " + nombreFila + "\n";
        resultado = resultado + "CONSUMO REAL (usando el aparato):\n";
        resultado = resultado + "Diario: " + activoFila.toFixed(3) + " kWh\n";
        resultado = resultado + "Semanal: " + (activoFila * 7).toFixed(2) + " kWh\n";
        resultado = resultado + "Mensual: " + (activoFila * 30).toFixed(2) + " kWh\n\n";

        if (conectado == "si" && fantasmaFila > 0) {
            resultado = resultado + "GASTO (standby):\n";
            resultado = resultado + "Diario: " + fantasmaFila.toFixed(3) + " kWh\n";
            resultado = resultado + "Semanal: " + (fantasmaFila * 7).toFixed(2) + " kWh\n";
            resultado = resultado + "Mensual: " + (fantasmaFila * 30).toFixed(2) + " kWh\n\n";
        }

        resultado = resultado + "TOTAL DEL PRODUCTO (real con standby):\n";
        resultado = resultado + "Diario: " + totalFila.toFixed(3) + " kWh\n";
        resultado = resultado + "Semanal: " + (totalFila * 7).toFixed(2) + " kWh\n";
        resultado = resultado + "Mensual: " + (totalFila * 30).toFixed(2) + " kWh\n\n";
        resultado = resultado + "\n\n";
    }

    resultado = resultado + "RESUMEN TOTAL \n\n";
    resultado = resultado + "CONSUMO REAL TOTAL (todos los productos):\n";
    resultado = resultado + "Diario: " + sumaActivoTotal.toFixed(2) + " kWh\n";
    resultado = resultado + "Semanal: " + (sumaActivoTotal * 7).toFixed(2) + " kWh\n";
    resultado = resultado + "Mensual: " + (sumaActivoTotal * 30).toFixed(2) + " kWh\n\n";// las n son para saltos de linea

    resultado = resultado + "GASTO TOTAL (standby de todos):\n";
    resultado = resultado + "Diario: " + sumaFantasmaTotal.toFixed(2) + " kWh\n";
    resultado = resultado + "Semanal: " + (sumaFantasmaTotal * 7).toFixed(2) + " kWh\n";
    resultado = resultado + "Mensual: " + (sumaFantasmaTotal * 30).toFixed(2) + " kWh\n\n";

    resultado = resultado + "TOTAL GENERAL (real con standby):\n";
    resultado = resultado + "Diario: " + sumaGlobal.toFixed(2) + " kWh\n";
    resultado = resultado + "Semanal: " + (sumaGlobal * 7).toFixed(2) + " kWh\n";
    resultado = resultado + "Mensual: " + (sumaGlobal * 30).toFixed(2) + " kWh\n";

    document.getElementById("cajaFantasma").innerHTML = "<pre>" + resultado + "</pre>";// el pre es para que se mantenga el formato de salto de linea y espacios
    document.getElementById("cajaResumen").style.display = "block";
}