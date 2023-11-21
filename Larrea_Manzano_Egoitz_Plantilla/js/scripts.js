'use strict'
// Funcion para agretar ficheros js 
function include(file) {
 
  let script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);

}
//Incluimos el objeto Socio necesario para la aplicacion
//include('./model/Socio.js');

console.log('Empieza el programa')

// ------------------- VARIABLES GLOBALES ------------------------


document.addEventListener("DOMContentLoaded", function() {
 // cargarJSON();
 console.log("carga2");
}); 

$(document).ready(function(){
	console.log("carga");
});

// ------------------- FUNCIONES ------------------------

// EJERCICIO 1

/*
  funcion para leer del JSON
*/
function cargarJSON () {
  let path = 'model/XXXXX.json'

  let request = new Request(path, {
    headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  })

  fetch(request).then(response => {
      response.json().then(data => {
      //aniadiraArray(data)
      console.log('Datos', data)
    })
  })
}

/* 
TODO:  metodo para añadir socios al array 
    cuando arranca la pagina web
*/
function aniadiraArray (data) {
    console.log('socios', data);
  /*  for( var i=0;(data.socios!==undefined) && (i< data.socios.length) ;i++){
      console.log(i+" :"+data.socios[i]);
      let socio= new Socio(i,data.socios[i].nombre,data.socios[i].apellido);
      socios.anadirSocio(socio);
    }
    console.log(socios.listaSocios.length);*/
  
}



// ------------------- MAIN ------------------------

// TODO: añadimos los socios iniciales cuando empieza el programa

console.log('Acaba el programa')
